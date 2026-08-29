import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextRequest, NextResponse } from "next/server";
import { query } from "../../../../../lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = (await req.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ["image/*", "video/*"],
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ leadId: params.id }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        const { leadId } = JSON.parse(tokenPayload || "{}");
        const mediaType = blob.contentType?.startsWith("video") ? "video" : "image";
        await query(
          `INSERT INTO lead_media (lead_id, url, media_type) VALUES ($1, $2, $3)`,
          [leadId, blob.url, mediaType]
        );
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
