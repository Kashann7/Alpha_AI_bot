import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory storage for demo
const users: Array<{ id: string; name: string; email: string; password: string }> = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  },
]

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    console.log("Signup attempt:", { name, email })

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 400 },
      )
    }

    // Create user
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password,
    }
    users.push(user)

    console.log("User created:", user.email)

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup API error:", error)
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
