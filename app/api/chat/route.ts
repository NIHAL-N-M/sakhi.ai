import { type NextRequest, NextResponse } from "next/server"
import { generateLegalResponse } from "@/lib/gemini"

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Add logging to help with debugging
    console.log("Received chat request:", message)

    const response = await generateLegalResponse(message)

    // Log the response for debugging
    console.log("Generated response:", response.text.substring(0, 100) + "...")

    return NextResponse.json({ response: response.text })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
