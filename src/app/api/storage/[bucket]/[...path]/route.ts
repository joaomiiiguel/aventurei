import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ bucket: string; path: string[] }> }
) {
  const { bucket, path } = await params;
  const supabase = await createClient();

  const filePath = path.join("/");

  // Fetch the file from Supabase Storage
  const { data, error } = await supabase.storage
    .from(bucket)
    .download(filePath);

  if (error || !data) {
    console.error(`Error downloading file from bucket "${bucket}", path "${filePath}":`, error);
    return new NextResponse("File not found", { status: 404 });
  }

  // Get content type from the blob
  const contentType = data.type || "application/octet-stream";

  return new NextResponse(data, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable", // Cache for 1 year
    },
  });
}
