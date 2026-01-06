import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { verifyToken } from "@/lib/auth/user-service"

const cartsFile = path.join(process.cwd(), "database", "carts.json")

type UserCarts = {
  [userId: string]: CartItem[]
}

type CartItem = {
  id: string
  name: string
  brand: string
  price: number
  quantity: number
  image?: string
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json([], { status: 200 }) // Return empty cart for unauthenticated users
    }

    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json([], { status: 200 }) // Return empty cart for invalid tokens
    }

    // Read user carts
    let userCarts: UserCarts = {}
    try {
      const data = await fs.readFile(cartsFile, "utf-8")
      const parsedData = JSON.parse(data)

      // Handle migration from array format to object format
      if (Array.isArray(parsedData)) {
        // If it's an old array format, convert it to object format
        userCarts = parsedData.length > 0 ? { 'legacy-user': parsedData } : {}
      } else {
        userCarts = parsedData
      }
    } catch (error) {
      // File doesn't exist or invalid, start with empty object
      userCarts = {}
    }

    // Return user's cart or empty array
    const userCart = userCarts[user.id] || []
    return NextResponse.json(userCart)
  } catch (error) {
    console.error("Cart fetch error:", error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { action, item, id, quantity } = await request.json()

    // Read existing user carts
    let userCarts: UserCarts = {}
    try {
      const data = await fs.readFile(cartsFile, "utf-8")
      const parsedData = JSON.parse(data)
      // Handle migration from array format to object format
      if (Array.isArray(parsedData)) {
        // If it's an old array format, convert it to object format
        userCarts = parsedData.length > 0 ? { 'legacy-user': parsedData } : {}
      } else {
        userCarts = parsedData
      }
    } catch (error) {
      // File doesn't exist, start with empty object
      userCarts = {}
    }

    // Get or create user's cart
    let cart = userCarts[user.id] || []

    if (action === "add") {
      if (!item) {
        return NextResponse.json({ error: "Item data required" }, { status: 400 })
      }

      const existingItem = cart.find((i) => i.id === item.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        cart.push({ ...item, quantity: 1 })
      }
    } else if (action === "update") {
      if (!id || quantity === undefined) {
        return NextResponse.json({ error: "ID and quantity required" }, { status: 400 })
      }

      const itemIndex = cart.findIndex((i) => i.id === id)
      if (itemIndex !== -1) {
        if (quantity <= 0) {
          cart.splice(itemIndex, 1)
        } else {
          cart[itemIndex].quantity = quantity
        }
      }
    } else if (action === "remove") {
      if (!id) {
        return NextResponse.json({ error: "ID required" }, { status: 400 })
      }

      cart = cart.filter((i) => i.id !== id)
    } else if (action === "clear") {
      cart = []
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    // Update user's cart
    userCarts[user.id] = cart

    // Write back to file
    await fs.writeFile(cartsFile, JSON.stringify(userCarts, null, 2))

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Cart update error:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }

    // Read existing user carts
    let userCarts: UserCarts = {}
    try {
      const data = await fs.readFile(cartsFile, "utf-8")
      userCarts = JSON.parse(data)
    } catch (error) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 })
    }

    // Get user's cart
    let cart = userCarts[user.id] || []

    // Remove item
    cart = cart.filter((i) => i.id !== id)

    // Update user's cart
    userCarts[user.id] = cart

    // Write back to file
    await fs.writeFile(cartsFile, JSON.stringify(userCarts, null, 2))

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Cart delete error:", error)
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 })
  }
}