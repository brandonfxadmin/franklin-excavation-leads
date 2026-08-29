import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../lib/db";
import { mapLead } from "../../../lib/mappers";
import { nanoid } from "nanoid";

export async function GET() {
  const result = await query(
    "SELECT * FROM leads ORDER BY created_at DESC"
  );
  return NextResponse.json(result.rows.map(mapLead));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, email, address, adminNotes } = body;

  if (!name || !String(name).trim()) {
    return NextResponse.json({ error: "Client name is required" }, { status: 400 });
  }

  const id = nanoid(10);
  const result = await query(
    `INSERT INTO leads (id, name, phone, email, address, admin_notes, status)
     VALUES ($1, $2, $3, $4, $5, $6, 'link_sent')
     RETURNING *`,
    [id, name, phone || null, email || null, address || null, adminNotes || null]
  );

  return NextResponse.json(mapLead(result.rows[0]), { status: 201 });
}
