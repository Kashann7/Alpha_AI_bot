"use client"

import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Send, ArrowLeft, Bot, User, Sparkles } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

export default function NewChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<{ name: string; isDemo?: boolean } | null>(null)
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

  const handleUpgrade = () => {
    router.push("/auth/signup")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {user.isDemo ? "Demo Chat" : "New Chat"}
                </h1>
                {user.isDemo && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Demo
                  </Badge>
                )}
              </div>
            </div>
            {user.isDemo && (
              <Button size="sm" onClick={handleUpgrade}>
                Sign Up for Full Access
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      {user.isDemo && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-center">
              <span className="text-sm text-blue-800 dark:text-blue-200">
                🎉 You're trying our AI assistant! This is a fully functional demo.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Chat Interface */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <span>AI Assistant</span>
              {user.isDemo && (
                <Badge variant="outline" className="text-xs">
                  Demo Mode
                </Badge>
              )}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                  <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">
                    {user.isDemo ? "Welcome to the AI Chat Demo!" : "Start a conversation"}
                  </h3>
                  <p className="mb-4">
                    {user.isDemo
                      ? "Try asking me anything! I can help with business questions, technical support, creative tasks, and more."
                      : "Ask me anything! I'm here to help with your questions and tasks."}
                  </p>
                  {user.isDemo && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg max-w-md mx-auto">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                        Try these sample questions:
                      </p>
                      <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
                        <li>• "How can I improve my startup's growth strategy?"</li>
                        <li>• "Explain React hooks to me"</li>
                        <li>• "Write a professional email template"</li>
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
                          <Bot className="h-8 w-8 p-1.5 bg-blue-100 dark:bg-blue-900 text-blue-600 rounded-full" />
                        </div>
                      )}

                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>

                      {message.role === "user" && (
                        <div className="flex-shrink-0">
                          <User className="h-8 w-8 p-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex items-start space-x-3">
                      <Bot className="h-8 w-8 p-1.5 bg-blue-100 dark:bg-blue-900 text-blue-600 rounded-full" />
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={
                    user.isDemo ? "Try asking: 'How can I improve my business strategy?'" : "Type your message here..."
                  }
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
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
