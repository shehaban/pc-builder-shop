import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const ordersFile = path.join(process.cwd(), "database", "orders.json")

export async function POST(request: NextRequest) {
  try {
    const { items, shipping, total } = await request.json()

    if (!items || !shipping || total === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Read existing orders
    let orders: any[] = []
    try {
      const data = await fs.readFile(ordersFile, "utf-8")
      orders = JSON.parse(data)
    } catch (error) {
      // File doesn't exist or empty, start with empty array
      orders = []
    }

    // Create new order
    const newOrder = {
      id: Date.now().toString(),
      items,
      shipping,
      total,
      status: "pending",
      created_at: new Date().toISOString(),
    }

    orders.push(newOrder)

    // Write back to file
    await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2))

    return NextResponse.json({ order: newOrder })
  } catch (error) {
    console.error("Order creation error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const data = await fs.readFile(ordersFile, "utf-8")
    const orders = JSON.parse(data)
    return NextResponse.json(orders)
  } catch (error) {
    console.error("Orders fetch error:", error)
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 })
  }
}