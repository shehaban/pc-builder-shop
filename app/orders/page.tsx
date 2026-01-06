"use client"

import { useEffect, useState } from "react"
import { Package, Calendar, MapPin, Phone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Order = {
  id: string
  items: any[]
  shipping: {
    fullName: string
    address: string
    phone: string
    city: string
  }
  total: number
  status: string
  created_at: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders")
        const data = await response.json()

        // Sort orders: pending first, then by newest created date
        const sortedOrders = data.sort((a: Order, b: Order) => {
          // First priority: pending orders come first
          if (a.status === "pending" && b.status !== "pending") return -1
          if (b.status === "pending" && a.status !== "pending") return 1

          // Second priority: newer orders first
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        })

        setOrders(sortedOrders)
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground">You haven't placed any orders yet. Start shopping to see your orders here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(order.created_at).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge variant={order.status === "pending" ? "secondary" : "default"}>
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Items</h3>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} (x{item.quantity})</span>
                        <span>${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border mt-3 pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${order.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Shipping Address</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{order.shipping.fullName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {order.shipping.address}, {order.shipping.city}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {order.shipping.phone}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}