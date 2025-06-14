"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Zap, Shield, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()

  const handleViewDemo = () => {
    // Set demo user in localStorage
    const demoUser = {
      id: "demo",
      name: "Demo User",
      email: "demo@example.com",
      isDemo: true,
    }

    localStorage.setItem("token", "demo-token")
    localStorage.setItem("user", JSON.stringify(demoUser))

    // Navigate to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">AI Chat SaaS</span>
          </div>
          <div className="space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Intelligent AI Assistant
          <span className="block text-blue-600">For Your Business</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Empower your team with AI-powered chat assistance. Get instant answers, automate workflows, and boost
          productivity with our intelligent platform.
        </p>
        <div className="space-x-4">
          <Link href="/auth/signup">
            <Button size="lg" className="px-8 py-3">
              Start Free Trial
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="px-8 py-3" onClick={handleViewDemo}>
            View Demo
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Powerful Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Zap className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Lightning Fast</CardTitle>
              <CardDescription>
                Get instant responses powered by advanced AI models with real-time streaming.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Secure & Private</CardTitle>
              <CardDescription>
                Enterprise-grade security with end-to-end encryption and data privacy protection.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>
                Share conversations, collaborate on projects, and manage team access seamlessly.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Ready to Get Started?</CardTitle>
            <CardDescription className="text-lg">
              Join thousands of teams already using our AI assistant platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/auth/signup">
              <Button size="lg" className="px-8 py-3 mr-4">
                Start Your Free Trial
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-3" onClick={handleViewDemo}>
              Try Demo Now
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
