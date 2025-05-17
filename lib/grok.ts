import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"

// Create a model instance with Grok
const model = xai("grok-3-beta")

export async function generateLegalResponse(prompt: string) {
  try {
    const { text } = await generateText({
      model,
      prompt: `You are a legal assistant specializing in Indian law, with a particular focus on women's rights, gender-based issues, property law, labor law, and family law. Provide accurate, helpful, and empathetic information tailored to women's unique challenges. Your responses should be informative but easy to understand for someone without legal background.

      When discussing legal matters affecting women:
      1. Explain relevant laws and rights in simple terms, highlighting protections specifically for women
      2. Provide practical next steps when appropriate, considering the unique challenges women may face
      3. Mention if there are state-specific variations to consider that might impact women differently
      4. Suggest when professional legal consultation might be necessary and how to find women-friendly legal resources
      5. Be empathetic and supportive in your tone, recognizing the emotional aspects of legal challenges women face
      
      User query: ${prompt}`,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return { text }
  } catch (error) {
    console.error("Error generating legal response with Grok:", error)
    return {
      text: "I'm sorry, I encountered an error while processing your request. Please try again later.",
    }
  }
}

export async function generateDocument(documentType: string, userInfo: Record<string, string>) {
  try {
    const { text } = await generateText({
      model,
      prompt: `Generate a ${documentType} document using the following information, with special attention to women's rights and protections where applicable:
      
      ${Object.entries(userInfo)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")}
      
      Format the document professionally and include all necessary legal language and sections for a valid ${documentType} in India. If this document relates to women's rights (such as domestic violence protection, workplace harassment, etc.), be sure to include specific protections and provisions that apply to women under Indian law.`,
      temperature: 0.3,
      maxTokens: 2000,
    })

    return { text }
  } catch (error) {
    console.error("Error generating document with Grok:", error)
    return {
      text: "I'm sorry, I encountered an error while generating your document. Please try again later.",
    }
  }
}
