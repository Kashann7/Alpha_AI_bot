"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Plus, Settings, LogOut, Sparkles } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ChatSession {
  id: string
  title: string
  lastMessage: string
  timestamp: string
}

interface User {
  id: string
  name: string
  email: string
  isDemo?: boolean
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/auth/signin")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      console.log("Dashboard loaded for user:", parsedUser)

      // Different chat sessions for demo vs regular users
      if (parsedUser.isDemo) {
        setChatSessions([
          {
            id: "demo-1",
            title: "Welcome to AI Chat Demo!",
            lastMessage: "Hi! I'm your AI assistant. Ask me anything!",
            timestamp: "Just now",
          },
          {
            id: "demo-2",
            title: "Sample Business Query",
            lastMessage: "How can I improve my startup's growth strategy?",
            timestamp: "5 minutes ago",
          },
          {
            id: "demo-3",
            title: "Technical Help Example",
            lastMessage: "Explain React hooks to me",
            timestamp: "10 minutes ago",
          },
        ])
      } else {
        setChatSessions([
          {
            id: "1",
            title: "Project Planning Discussion",
            lastMessage: "How can I improve my project timeline?",
            timestamp: "2 hours ago",
          },
          {
            id: "2",
            title: "Technical Support",
            lastMessage: "Help me debug this React component",
            timestamp: "1 day ago",
          },
        ])
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/auth/signin")
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleUpgrade = () => {
    router.push("/auth/signup")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <MessageSquare className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Chat SaaS</h1>
              {user.isDemo && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Demo Mode
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">Welcome, {user.name}</span>
              {user.isDemo && (
                <Button size="sm" onClick={handleUpgrade}>
                  Upgrade to Full Version
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      {user.isDemo && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  You're in demo mode! Try our AI assistant with full features.
                </span>
              </div>
              <Button size="sm" variant="outline" onClick={handleUpgrade}>
                Sign Up for Free
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Chat Sessions
                  <Link href="/chat/new">
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      New
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {chatSessions.map((session) => (
                  <Link key={session.id} href={`/chat/new`}>
                    <div className="p-3 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                      <h4 className="font-medium text-sm truncate">{session.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 truncate">{session.lastMessage}</p>
                      <p className="text-xs text-gray-400 mt-1">{session.timestamp}</p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Start</CardTitle>
                  <CardDescription>
                    {user.isDemo
                      ? "Try our AI assistant with this demo conversation"
                      : "Start a new conversation with our AI assistant"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/chat/new">
                    <Button className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      {user.isDemo ? "Try AI Chat Demo" : "Start New Chat"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Stats</CardTitle>
                  <CardDescription>{user.isDemo ? "Demo activity" : "Your activity this month"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Messages sent:</span>
                      <span className="font-medium">{user.isDemo ? "∞" : "127"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">AI responses:</span>
                      <span className="font-medium">{user.isDemo ? "∞" : "124"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Chat sessions:</span>
                      <span className="font-medium">{user.isDemo ? "Unlimited" : "15"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>{user.isDemo ? "Demo Conversations" : "Recent Activity"}</CardTitle>
                <CardDescription>
                  {user.isDemo
                    ? "Sample conversations to try out our AI assistant"
                    : "Your latest interactions with the AI assistant"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chatSessions.map((session) => (
                    <div key={session.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                      <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{session.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{session.lastMessage}</p>
                        <p className="text-xs text-gray-400 mt-2">{session.timestamp}</p>
                      </div>
                      <Link href="/chat/new">
                        <Button variant="ghost" size="sm">
                          {user.isDemo ? "Try Now" : "Continue"}
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
