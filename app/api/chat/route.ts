import type { NextRequest } from "next/server"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Simple mock response for now to avoid AI SDK issues
    const lastMessage = messages[messages.length - 1]?.content || ""

    // Create a mock AI response based on the user's message
    let response = ""

    if (lastMessage.toLowerCase().includes("business") || lastMessage.toLowerCase().includes("strategy")) {
      response = `Great question about business strategy! Here are some key insights:

1. **Market Analysis**: Understanding your target market is crucial for success
2. **Competitive Advantage**: Identify what makes your solution unique
3. **Scalability**: Plan for growth from day one
4. **Customer Feedback**: Continuously gather and implement user feedback
5. **Financial Planning**: Maintain healthy cash flow and plan for investments

Would you like me to dive deeper into any of these areas?`
    } else if (
      lastMessage.toLowerCase().includes("technical") ||
      lastMessage.toLowerCase().includes("code") ||
      lastMessage.toLowerCase().includes("react")
    ) {
      response = `I'd be happy to help with technical questions! Here's some guidance:

**React Best Practices:**
- Use functional components with hooks
- Implement proper state management
- Optimize performance with useMemo and useCallback
- Follow component composition patterns
- Write clean, readable code with TypeScript

**Development Tips:**
- Use version control effectively
- Write comprehensive tests
- Follow coding standards
- Document your code
- Stay updated with latest technologies

What specific technical challenge are you facing?`
    } else if (lastMessage.toLowerCase().includes("ai") || lastMessage.toLowerCase().includes("alpha")) {
      response = `Welcome to Alpha AI Bot! I'm here to assist you with:

🚀 **Business Strategy & Planning**
🔧 **Technical Development & Coding**
📊 **Data Analysis & Insights**
💡 **Creative Problem Solving**
🎯 **Project Management**

I use advanced neural networks to provide intelligent, context-aware responses. Feel free to ask me anything - from complex business questions to technical challenges!

How can I help you today?`
    } else {
      response = `Hello! I'm Alpha AI Bot, your advanced neural assistant. I can help you with:

• Business strategy and growth planning
• Technical development and coding
• Creative problem solving
• Data analysis and insights
• Project management advice

I'm designed to provide intelligent, contextual responses using advanced AI capabilities. What would you like to explore today?`
    }

    // Create a streaming response
    const encoder = new TextEncoder()

    const stream = new ReadableStream({
      start(controller) {
        // Split response into chunks for streaming effect
        const words = response.split(" ")
        let index = 0

        const sendChunk = () => {
          if (index < words.length) {
            const chunk = words[index] + " "
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`))
            index++
            setTimeout(sendChunk, 50) // Delay between words for streaming effect
          } else {
            controller.enqueue(encoder.encode(`data: [DONE]\n\n`))
            controller.close()
          }
        }

        sendChunk()
      },
    })

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
