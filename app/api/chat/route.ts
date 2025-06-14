import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Add system message for context
    const systemMessage = {
      role: "system" as const,
      content: `You are an intelligent AI assistant for a SaaS platform. You help users with:
      - Technical questions and troubleshooting
      - Business strategy and planning
      - Project management advice
      - General productivity tips
      - Code review and programming help
      
      Be helpful, professional, and provide actionable advice. Keep responses concise but comprehensive.`,
    }

    const result = streamText({
      model: openai("gpt-4o"),
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      maxTokens: 1000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
