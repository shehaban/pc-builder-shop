import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('file')

    if (!filename) {
      return NextResponse.json({ error: "Filename required" }, { status: 400 })
    }

    console.log("GET /api/image called for file:", filename)

    // Security check - only allow certain file extensions
    if (!filename.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      console.log("Invalid file type:", filename)
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    const imagePath = path.join(process.cwd(), "public", "images", filename)
    console.log("Looking for image at:", imagePath)

    try {
      const imageBuffer = await fs.readFile(imagePath)
      console.log("Image found, size:", imageBuffer.length)

      // Detect MIME type based on extension
      const ext = filename.split('.').pop()?.toLowerCase()
      let mimeType = 'image/jpeg'
      if (ext === 'png') mimeType = 'image/png'
      else if (ext === 'gif') mimeType = 'image/gif'
      else if (ext === 'webp') mimeType = 'image/webp'

      return new NextResponse(imageBuffer, {
        headers: {
          'Content-Type': mimeType,
          'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
        },
      })
    } catch (error) {
      console.log("Image not found at:", imagePath, "error:", error)
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Image serving error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}