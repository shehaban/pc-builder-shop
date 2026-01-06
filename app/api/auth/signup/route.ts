import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import bcrypt from "bcryptjs"

const usersFile = path.join(process.cwd(), "database", "users.json")

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Read existing users
    let users: any[] = []
    try {
      const data = await fs.readFile(usersFile, "utf-8")
      users = JSON.parse(data)
    } catch (error) {
      // File doesn't exist or empty, start with empty array
      users = []
    }

    // Check if user already exists
    const existingUser = users.find((u: any) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      is_admin: false,
    }

    users.push(newUser)

    // Write back to file
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2))

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}