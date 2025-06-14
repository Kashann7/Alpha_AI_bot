"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Zap, Shield, ArrowRight, Sparkles, Brain, Cpu } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  const handleViewDemo = () => {
    try {
      // Set demo user in localStorage
      const demoUser = {
        id: "demo",
        name: "Demo User",
        email: "demo@alphaai.com",
        isDemo: true,
      }

      localStorage.setItem("token", "demo-token")
      localStorage.setItem("user", JSON.stringify(demoUser))

      // Navigate to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error setting demo user:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Bot className="h-10 w-10 text-cyan-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Alpha AI Bot
              </span>
              <div className="text-xs text-gray-400">v2.0.1</div>
            </div>
          </div>
          <div className="space-x-4">
            <Link href="/auth/signin">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white border border-gray-600 hover:border-cyan-400 transition-all duration-300"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 mb-8">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Powered by Advanced Neural Networks</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Next-Gen AI
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Assistant
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the future of AI interaction with Alpha AI Bot. Advanced reasoning, real-time responses, and
            intelligent automation at your fingertips.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 group"
              onClick={handleViewDemo}
            >
              <Brain className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Experience Alpha AI
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link href="/auth/signup">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 border-2 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 bg-transparent hover:bg-cyan-400/10 transition-all duration-300"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Advanced AI Capabilities
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cutting-edge technology meets intuitive design for the ultimate AI experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-cyan-500/50 transition-all duration-300 group">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white text-xl">Lightning Processing</CardTitle>
              <CardDescription className="text-gray-400">
                Ultra-fast neural processing with sub-second response times and real-time streaming capabilities.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-purple-500/50 transition-all duration-300 group">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white text-xl">Quantum Security</CardTitle>
              <CardDescription className="text-gray-400">
                Military-grade encryption with quantum-resistant algorithms protecting your data and conversations.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-green-500/50 transition-all duration-300 group">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-white text-xl">Neural Networks</CardTitle>
              <CardDescription className="text-gray-400">
                Advanced deep learning models with contextual understanding and adaptive intelligence.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                99.9%
              </div>
              <div className="text-gray-400">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {"<50ms"}
              </div>
              <div className="text-gray-400">Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                1M+
              </div>
              <div className="text-gray-400">Conversations</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-400">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 text-center">
        <Card className="max-w-3xl mx-auto bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border-gray-700">
          <CardHeader className="pb-8">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
              Ready for the Future?
            </CardTitle>
            <CardDescription className="text-lg text-gray-300">
              Join thousands of innovators already using Alpha AI Bot to transform their workflow
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
                onClick={handleViewDemo}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Try Alpha AI Now
              </Button>
              <Link href="/auth/signup">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 border-2 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 bg-transparent hover:bg-cyan-400/10 transition-all duration-300"
                >
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
