"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Plus, Settings, LogOut, Sparkles, Brain, Zap, Activity } from "lucide-react"
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
            title: "🚀 Welcome to Alpha AI!",
            lastMessage: "Hi! I'm Alpha AI, your advanced neural assistant. Ready to explore?",
            timestamp: "Just now",
          },
          {
            id: "demo-2",
            title: "💼 Business Strategy Analysis",
            lastMessage: "How can I leverage AI to scale my startup exponentially?",
            timestamp: "2 minutes ago",
          },
          {
            id: "demo-3",
            title: "⚡ Technical Deep Dive",
            lastMessage: "Explain quantum computing and its applications",
            timestamp: "5 minutes ago",
          },
        ])
      } else {
        setChatSessions([
          {
            id: "1",
            title: "Project Alpha Planning",
            lastMessage: "How can I optimize my neural network architecture?",
            timestamp: "2 hours ago",
          },
          {
            id: "2",
            title: "Advanced AI Research",
            lastMessage: "Help me understand transformer architectures",
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Bot className="h-16 w-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-300 text-lg">Initializing Alpha AI...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bot className="h-10 w-10 text-cyan-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Alpha AI Bot
                </h1>
                <div className="text-xs text-gray-400 font-mono">Neural Dashboard v2.0</div>
              </div>
              {user.isDemo && (
                <Badge className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Demo Mode
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">
                Welcome, <span className="text-cyan-400 font-medium">{user.name}</span>
              </span>
              {user.isDemo && (
                <Button
                  size="sm"
                  onClick={handleUpgrade}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0"
                >
                  Upgrade to Pro
                </Button>
              )}
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-400">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-400 hover:text-red-400">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      {user.isDemo && (
        <div className="relative z-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b border-cyan-500/30">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Brain className="h-5 w-5 text-cyan-400 animate-pulse" />
                <span className="text-sm font-medium text-cyan-100">
                  🎯 You're experiencing Alpha AI in demo mode - Full neural capabilities active!
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleUpgrade}
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
              >
                Unlock Full Power
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <span className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-cyan-400" />
                    <span>Neural Sessions</span>
                  </span>
                  <Link href="/chat/new">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      New
                    </Button>
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {chatSessions.map((session) => (
                  <Link key={session.id} href={`/chat/new`}>
                    <div className="p-3 rounded-lg border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-700/50 cursor-pointer transition-all duration-300 group">
                      <h4 className="font-medium text-sm truncate text-white group-hover:text-cyan-400 transition-colors">
                        {session.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1 truncate">{session.lastMessage}</p>
                      <p className="text-xs text-gray-500 mt-1">{session.timestamp}</p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-gray-700 hover:border-cyan-500/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-cyan-400" />
                    <span>Neural Interface</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {user.isDemo
                      ? "Experience Alpha AI's advanced neural processing capabilities"
                      : "Start a new conversation with Alpha AI's neural network"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/chat/new">
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                      <Zap className="h-4 w-4 mr-2" />
                      {user.isDemo ? "Activate Alpha AI" : "Initialize Neural Chat"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-purple-400" />
                    <span>System Metrics</span>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {user.isDemo ? "Demo performance analytics" : "Your neural network activity"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Neural Queries:</span>
                      <span className="font-medium text-cyan-400">{user.isDemo ? "∞" : "127"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">AI Responses:</span>
                      <span className="font-medium text-purple-400">{user.isDemo ? "∞" : "124"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Sessions:</span>
                      <span className="font-medium text-pink-400">{user.isDemo ? "Unlimited" : "15"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-cyan-400" />
                  <span>{user.isDemo ? "Demo Neural Conversations" : "Recent Neural Activity"}</span>
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {user.isDemo
                    ? "Sample conversations showcasing Alpha AI's capabilities"
                    : "Your latest interactions with Alpha AI's neural network"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {chatSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-start space-x-3 p-4 rounded-lg border border-gray-700 hover:border-cyan-500/50 hover:bg-gray-700/30 transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-white group-hover:text-cyan-400 transition-colors">
                          {session.title}
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">{session.lastMessage}</p>
                        <p className="text-xs text-gray-500 mt-2">{session.timestamp}</p>
                      </div>
                      <Link href="/chat/new">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-cyan-400 border border-gray-600 hover:border-cyan-500"
                        >
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
