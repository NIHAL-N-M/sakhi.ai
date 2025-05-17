import { type NextRequest, NextResponse } from "next/server"
import { generateDocument } from "@/lib/gemini"

export async function POST(req: NextRequest) {
  try {
    const { documentType, userInfo } = await req.json()

    if (!documentType || !userInfo) {
      return NextResponse.json({ error: "Document type and user information are required" }, { status: 400 })
    }

    const response = await generateDocument(documentType, userInfo)

    return NextResponse.json({ document: response.text })
  } catch (error) {
    console.error("Error in document generation API:", error)
    return NextResponse.json({ error: "Failed to generate document" }, { status: 500 })
  }
}
