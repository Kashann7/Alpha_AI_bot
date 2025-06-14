"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, ArrowLeft, Bot, User, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function NewChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<{ name: string; isDemo?: boolean } | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (!token || !userData) {
      router.push("/auth/signin")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (error) {
      router.push("/auth/signin")
    }
  }, [router])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Handle streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6)
              if (data === "[DONE]") {
                break
              }
              try {
                const parsed = JSON.parse(data)
                if (parsed.content) {
                  setMessages((prev) => {
                    const newMessages = [...prev]
                    const lastMessage = newMessages[newMessages.length - 1]
                    if (lastMessage && lastMessage.role === "assistant") {
                      lastMessage.content += parsed.content
                    }
                    return newMessages
                  })
                }
              } catch (e) {
                // Ignore parsing errors
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpgrade = () => {
    router.push("/auth/signup")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Bot className="h-16 w-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-300 text-lg">Loading Alpha AI...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bot className="h-8 w-8 text-cyan-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {user.isDemo ? "Alpha AI Demo" : "Alpha AI Chat"}
                  </h1>
                  <div className="text-xs text-gray-400">Neural Interface Active</div>
                </div>
                {user.isDemo && (
                  <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Demo
                  </Badge>
                )}
              </div>
            </div>
            {user.isDemo && (
              <Button
                size="sm"
                onClick={handleUpgrade}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0"
              >
                Upgrade to Pro
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      {user.isDemo && (
        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b border-cyan-500/30">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-center">
              <span className="text-sm text-cyan-100">
                🎯 You're experiencing Alpha AI's full neural capabilities in demo mode!
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="h-[calc(100vh-200px)] flex flex-col bg-gray-800/50 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Bot className="h-5 w-5 text-cyan-400" />
              <span>Alpha AI Assistant</span>
              {user.isDemo && (
                <Badge variant="outline" className="text-xs border-cyan-400 text-cyan-400">
                  Demo Mode
                </Badge>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-white">
                    {user.isDemo ? "Welcome to Alpha AI Demo!" : "Start Neural Conversation"}
                  </h3>
                  <p className="mb-4">
                    {user.isDemo
                      ? "Try asking me anything! I can help with business strategy, technical questions, creative tasks, and more."
                      : "I'm Alpha AI, your advanced neural assistant. Ask me anything!"}
                  </p>
                  {user.isDemo && (
                    <div className="bg-gray-700/50 p-4 rounded-lg max-w-md mx-auto">
                      <p className="text-sm font-medium text-cyan-400 mb-2">Try these sample questions:</p>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• "How can I scale my startup using AI?"</li>
                        <li>• "Explain React hooks and best practices"</li>
                        <li>• "Help me create a business strategy"</li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      )}

                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white"
                            : "bg-gray-700/50 text-gray-100 border border-gray-600"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>

                      {message.role === "user" && (
                        <div className="flex-shrink-0">
                          <User className="h-8 w-8 p-1.5 bg-gray-700 text-gray-300 rounded-full" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
                          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-400"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-gray-700 p-4">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    user.isDemo ? "Ask Alpha AI: 'How can I improve my business strategy?'" : "Message Alpha AI..."
                  }
                  className="flex-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
