"use client"

import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          <CardDescription>
            Thank you for your purchase. Your order has been successfully placed.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            You will receive an email confirmation shortly with your order details.
          </p>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/orders">View My Orders</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}