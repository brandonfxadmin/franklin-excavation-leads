import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { query } from "../../../../../lib/db";
import { mapMedia } from "../../../../../lib/mappers";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const mediaType = file.type.startsWith("video") ? "video" : "image";
  const blob = await put(`leads/${params.id}/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  const result = await query(
    `INSERT INTO lead_media (lead_id, url, media_type) VALUES ($1, $2, $3) RETURNING *`,
    [params.id, blob.url, mediaType]
  );

  return NextResponse.json(mapMedia(result.rows[0]), { status: 201 });
}
