import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../lib/db";
import { mapLead, mapMedia } from "../../../../lib/mappers";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const leadResult = await query("SELECT * FROM leads WHERE id = $1", [params.id]);
  if (leadResult.rows.length === 0) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
  const mediaResult = await query(
    "SELECT * FROM lead_media WHERE lead_id = $1 ORDER BY created_at ASC",
    [params.id]
  );
  return NextResponse.json({
    lead: mapLead(leadResult.rows[0]),
    media: mediaResult.rows.map(mapMedia),
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const existing = await query("SELECT * FROM leads WHERE id = $1", [params.id]);
  if (existing.rows.length === 0) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  // Client opened their link for the first time
  if (body.action === "mark_started") {
    if (existing.rows[0].status === "link_sent") {
      const result = await query(
        `UPDATE leads SET status = 'started', started_at = now() WHERE id = $1 RETURNING *`,
        [params.id]
      );
      return NextResponse.json(mapLead(result.rows[0]));
    }
    return NextResponse.json(mapLead(existing.rows[0]));
  }

  // Client submits the intake form
  if (body.action === "submit_form") {
    const { problemDescription, additionalDetails, timeline } = body;
    const result = await query(
      `UPDATE leads SET
        problem_description = $1,
        additional_details = $2,
        timeline = $3,
        status = 'form_completed',
        form_completed_at = now()
       WHERE id = $4
       RETURNING *`,
      [problemDescription || null, additionalDetails || null, timeline || null, params.id]
    );
    return NextResponse.json(mapLead(result.rows[0]));
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../lib/db";
import { mapLead, mapMedia } from "../../../../lib/mappers";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const leadResult = await query("SELECT * FROM leads WHERE id = $1", [params.id]);
  if (leadResult.rows.length === 0) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
  const mediaResult = await query(
    "SELECT * FROM lead_media WHERE lead_id = $1 ORDER BY created_at ASC",
    [params.id]
  );
  return NextResponse.json({
    lead: mapLead(leadResult.rows[0]),
    media: mediaResult.rows.map(mapMedia),
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const existing = await query("SELECT * FROM leads WHERE id = $1", [params.id]);
  if (existing.rows.length === 0) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  // Client opened their link for the first time
  if (body.action === "mark_started") {
    if (existing.rows[0].status === "link_sent") {
      const result = await query(
        `UPDATE leads SET status = 'started', started_at = now() WHERE id = $1 RETURNING *`,
        [params.id]
      );
      return NextResponse.json(mapLead(result.rows[0]));
    }
    return NextResponse.json(mapLead(existing.rows[0]));
  }

  // Client submits the intake form
  if (body.action === "submit_form") {
    const { problemDescription, additionalDetails, timeline } = body;
    const result = await query(
      `UPDATE leads SET
        problem_description = $1,
        additional_details = $2,
        timeline = $3,
        status = 'form_completed',
        form_completed_at = now()
       WHERE id = $4
       RETURNING *`,
      [problemDescription || null, additionalDetails || null, timeline || null, params.id]
    );
    return NextResponse.json(mapLead(result.rows[0]));
  }

  // Brandon posts a ballpark estimate
  if (body.action === "send_estimate") {
    const { estimateLow, estimateHigh, estimateNote } = body;
    const result = await query(
      `UPDATE leads SET
        estimate_low = $1,
        estimate_high = $2,
        estimate_note = $3,
        status = 'estimate_sent',
        estimate_sent_at = now()
       WHERE id = $4
       RETURNING *`,
      [estimateLow ?? null, estimateHigh ?? null, estimateNote || null, params.id]
    );
    return NextResponse.json(mapLead(result.rows[0]));
  }

  // Client responds to the estimate
  if (body.action === "client_response") {
    const { response } = body; // "approved" | "declined"
    if (response !== "approved" && response !== "declined") {
      return NextResponse.json({ error: "Invalid response" }, { status: 400 });
    }
    const result = await query(
      `UPDATE leads SET
        client_response = $1,
        status = $1,
        client_response_at = now()
       WHERE id = $2
       RETURNING *`,
      [response, params.id]
    );
    return NextResponse.json(mapLead(result.rows[0]));
  }

  // Generic admin edit (name/phone/address/notes)
  if (body.action === "update_details") {
    const { name, phone, address, adminNotes } = body;
    const result = await query(
      `UPDATE leads SET
        name = COALESCE($1, name),
        phone = $2,
        address = $3,
        admin_notes = $4
       WHERE id = $5
       RETURNING *`,
      [name || null, phone || null, address || null, adminNotes || null, params.id]
    );
    return NextResponse.json(mapLead(result.rows[0]));
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await query("DELETE FROM leads WHERE id = $1", [params.id]);
  return NextResponse.json({ ok: true });
}
