import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getSkillsDir } from "@/lib/skills";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string; path: string[] }> }
) {
  const { slug, path: assetPath } = await params;
  const SKILLS_DIR = getSkillsDir();
  
  try {
    const filePath = path.join(SKILLS_DIR, slug, "assets", ...assetPath);
    
    // Security check: ensure the resolved path is within the skills directory
    if (!filePath.startsWith(path.join(SKILLS_DIR, slug, "assets"))) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    if (!fs.existsSync(filePath)) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const file = await fs.promises.readFile(filePath);
    
    // Determine content type
    const ext = path.extname(filePath).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".png") contentType = "image/png";
    else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".svg") contentType = "image/svg+xml";
    else if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".gif") contentType = "image/gif";

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving asset:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
