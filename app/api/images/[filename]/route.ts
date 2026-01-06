import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  console.log("GET /api/images called with params:", await params)
  try {
    const { filename } = await params
    console.log("Serving image:", filename)

    // Security check - only allow certain file extensions
    if (!filename.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      console.log("Invalid file type:", filename)
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
    }

    const imagePath = path.join(process.cwd(), "public", "images", filename)

    try {
      console.log("Reading image from:", imagePath)
      const imageBuffer = await fs.readFile(imagePath)
      console.log("Image found, size:", imageBuffer.length)
      return new NextResponse(imageBuffer, {
        headers: {
          'Content-Type': 'image/jpeg', // You might want to detect the actual MIME type
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