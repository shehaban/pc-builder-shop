import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const cartsFile = path.join(process.cwd(), "database", "carts.json")

type CartItem = {
  id: string
  name: string
  brand: string
  price: number
  quantity: number
  image?: string
}

export async function GET() {
  try {
    const data = await fs.readFile(cartsFile, "utf-8")
    const cart: CartItem[] = JSON.parse(data)
    return NextResponse.json(cart)
  } catch (error) {
    console.error("Cart fetch error:", error)
    return NextResponse.json([], { status: 200 }) // Return empty cart if file doesn't exist
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, item, id, quantity } = await request.json()

    // Read existing cart
    let cart: CartItem[] = []
    try {
      const data = await fs.readFile(cartsFile, "utf-8")
      cart = JSON.parse(data)
    } catch (error) {
      // File doesn't exist or empty, start with empty array
      cart = []
    }

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

    // Write back to file
    await fs.writeFile(cartsFile, JSON.stringify(cart, null, 2))

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Cart update error:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }

    // Read existing cart
    let cart: CartItem[] = []
    try {
      const data = await fs.readFile(cartsFile, "utf-8")
      cart = JSON.parse(data)
    } catch (error) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 })
    }

    // Remove item
    cart = cart.filter((i) => i.id !== id)

    // Write back to file
    await fs.writeFile(cartsFile, JSON.stringify(cart, null, 2))

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Cart delete error:", error)
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 })
  }
}