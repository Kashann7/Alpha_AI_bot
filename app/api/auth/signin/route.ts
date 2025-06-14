import { type NextRequest, NextResponse } from "next/server"

// Mock users array - in real app, use database
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
  },
]

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    console.log("Login attempt:", { email })

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 })
    }

    // Compare passwords (plain text for demo)
    if (password !== user.password) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 })
    }

    // Generate simple token (in production, use proper JWT)
    const token = `token_${user.id}_${Date.now()}`

    console.log("Login successful for:", user.email)

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error("Signin API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
