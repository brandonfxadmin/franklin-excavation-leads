import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../../lib/db";
import { mapLead } from "../../../../../lib/mappers";
import { sendEmail } from "../../../../../lib/resend";
import { sendText } from "../../../../../lib/quo";
import { EMAIL_LOGO_DATA_URI } from "../../../../../lib/email-logo";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { channels } = (await req.json()) as { channels: string[] };
  const result = await query("SELECT * FROM leads WHERE id = $1", [params.id]);
  if (result.rows.length === 0) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
  const lead = mapLead(result.rows[0]);

  const origin = req.nextUrl.origin;
  const link = `${origin}/lead/${lead.id}`;
  const firstName = lead.name.split(" ")[0];
  const linkLabel = "FX Ballpark Estimate";

  const hasEstimate = lead.estimateLow !== null && lead.estimateHigh !== null;
  const subject = hasEstimate
    ? "Your ballpark estimate from Franklin Excavation"
    : "A quick form for your Franklin Excavation estimate";
  const messageText = hasEstimate
    ? `Hi ${firstName}, your ballpark estimate is ready.`
    : `Hi ${firstName}, please fill out this quick form so we can get you a ballpark estimate.`;

  const results: Record<string, { ok: boolean; error?: string }> = {};

  if (channels.includes("email")) {
    if (!lead.email) {
      results.email = { ok: false, error: "No email on file for this lead." };
    } else {
      results.email = await sendEmail({
        to: lead.email,
        subject,
        replyTo: "team@excavatefranklin.com",
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px 0;">
            <img src="${EMAIL_LOGO_DATA_URI}" alt="Franklin Excavation" width="96" height="96" style="display:block;margin:0 auto 20px;border-radius:20px;" />
            <p style="font-size:16px;line-height:1.5;color:#221f1b;text-align:center;">${messageText}</p>
            <p style="text-align:center;margin:28px 0;">
              <a href="${link}" style="background:#d9660b;color:#ffffff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;display:inline-block;">${linkLabel}</a>
            </p>
            <p style="font-size:13px;line-height:1.5;color:#7a7361;text-align:center;">
              Questions? Just reply to this email or call us at ${"615-282-5355"}.
            </p>
            <hr style="border:none;border-top:1px solid #e7dcc8;margin:24px 0;" />
            <p style="font-size:12px;line-height:1.5;color:#a39c8f;text-align:center;">
              Franklin Excavation · 1441 New Hwy 96 W Ste 2 #418, Franklin, TN 37064
            </p>
          </div>
        `,
        text: `${messageText}\n\n${linkLabel}: ${link}\n\nQuestions? Reply to this email or call 615-282-5355.\n\nFranklin Excavation, 1441 New Hwy 96 W Ste 2 #418, Franklin, TN 37064`,
      });
    }
  }

  if (channels.includes("text")) {
    if (!lead.phone) {
      results.text = { ok: false, error: "No phone number on file for this lead." };
    } else {
      results.text = await sendText({
        to: lead.phone,
        content: `${messageText} ${linkLabel}: ${link}`,
      });
    }
  }

  return NextResponse.json({ results });
}
