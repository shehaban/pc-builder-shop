import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { verifyToken } from "@/lib/auth/user-service"
import { canAccessAdmin } from "@/lib/auth/types"

const ordersFile = path.join(process.cwd(), "database", "orders.json")

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

    // Create new order with user ID
    const newOrder = {
      id: Date.now().toString(),
      user_id: user.id,
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

export async function GET(request: NextRequest) {
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

    const data = await fs.readFile(ordersFile, "utf-8")
    let orders = JSON.parse(data)

    // Filter orders based on user permissions
    if (!canAccessAdmin(user.role)) {
      // Regular users only see their own orders
      orders = orders.filter((order: any) => order.user_id === user.id)
    }
    // Admins see all orders

    return NextResponse.json(orders, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error("Orders fetch error:", error)
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check authentication and admin permissions
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = verifyToken(token)
    if (!user || !canAccessAdmin(user.role)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ error: "Order ID and status required" }, { status: 400 })
    }

    // Validate status
    const validStatuses = ["pending", "processing", "shipped", "delivered", "canceled"]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    // Read existing orders
    let orders: any[] = []
    try {
      const data = await fs.readFile(ordersFile, "utf-8")
      orders = JSON.parse(data)
    } catch (error) {
      return NextResponse.json({ error: "Orders not found" }, { status: 404 })
    }

    // Find and update order
    const orderIndex = orders.findIndex((order) => order.id === id)
    if (orderIndex === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    orders[orderIndex].status = status
    orders[orderIndex].updated_at = new Date().toISOString()

    // Write back to file
    await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2))

    // Small delay to ensure file write is complete
    await new Promise(resolve => setTimeout(resolve, 100))

    return NextResponse.json(orders[orderIndex], {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error("Order update error:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}