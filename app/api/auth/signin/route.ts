import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import bcrypt from "bcryptjs"

const usersFile = path.join(process.cwd(), "database", "users.json")

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    // Read existing users
    let users: any[] = []
    try {
      const data = await fs.readFile(usersFile, "utf-8")
      users = JSON.parse(data)
    } catch (error) {
      return NextResponse.json({ error: "No users found" }, { status: 404 })
    }

    // Find user
    const user = users.find((u) => u.email === email)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error("Signin error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}