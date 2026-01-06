import { NextRequest, NextResponse } from "next/server"
import { authenticateUser, generateToken } from "@/lib/auth/user-service"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    const user = await authenticateUser(email, password)
    console.log('Signin attempt - email:', email, 'user found:', !!user)
    if (user) {
      console.log('Signin user:', { id: user.id, email: user.email, role: user.role })
    }

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = generateToken(user)
    console.log('Signin token generated, length:', token.length)

    // Return token in response for localStorage storage
    return NextResponse.json({
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token: token
    })
  } catch (error) {
    console.error("Signin error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}