import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../../lib/db";
import { mapLead } from "../../../../../lib/mappers";
import { sendEmail } from "../../../../../lib/resend";
import { sendText } from "../../../../../lib/quo";

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

  const hasEstimate = lead.estimateLow !== null && lead.estimateHigh !== null;
  const subject = hasEstimate
    ? "Your ballpark estimate from Franklin Excavation"
    : "A quick form for your Franklin Excavation estimate";
  const bodyText = hasEstimate
    ? `Hi ${firstName}, your ballpark estimate is ready. View it here: ${link}`
    : `Hi ${firstName}, please fill out this quick form so we can get you a ballpark estimate: ${link}`;

  const results: Record<string, { ok: boolean; error?: string }> = {};

  if (channels.includes("email")) {
    if (!lead.email) {
      results.email = { ok: false, error: "No email on file for this lead." };
    } else {
      results.email = await sendEmail({
        to: lead.email,
        subject,
        html: `<p>${bodyText.replace(link, `<a href="${link}">${link}</a>`)}</p>`,
      });
    }
  }

  if (channels.includes("text")) {
    if (!lead.phone) {
      results.text = { ok: false, error: "No phone number on file for this lead." };
    } else {
      results.text = await sendText({ to: lead.phone, content: bodyText });
    }
  }

  return NextResponse.json({ results });
}
