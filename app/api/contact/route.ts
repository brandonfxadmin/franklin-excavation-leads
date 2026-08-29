import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";
import { nanoid } from "nanoid";

// Public endpoint for the marketing site's "Request a Free Estimate" form.
// Inserts straight into the same `leads` table the admin dashboard reads,
// marked as already form-completed since the visitor filled in the details
// themselves (skipping the link_sent -> started steps of the manual flow).
export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = String(body?.name || "").trim();
  const phone = String(body?.phone || "").trim();
  const email = String(body?.email || "").trim();
  const address = String(body?.address || "").trim();
  const timeline = String(body?.timeline || "").trim();
  const problemDescription = String(body?.problemDescription || "").trim();

  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  }

  // Basic sanity caps so a bad actor can't stuff huge payloads into the DB.
  if (name.length > 200 || phone.length > 50 || address.length > 300 || problemDescription.length > 4000) {
    return NextResponse.json({ error: "One of the fields is too long" }, { status: 400 });
  }

  const additionalDetails = email ? `Submitted via website contact form. Email: ${email}` : "Submitted via website contact form.";

  const id = nanoid(10);

  try {
    await query(
      `INSERT INTO leads (id, name, phone, address, problem_description, additional_details, timeline, status, form_completed_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'form_completed', now())`,
      [id, name, phone, address || null, problemDescription || null, additionalDetails, timeline || null]
    );
  } catch (err) {
    console.error("Failed to save contact form submission", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
