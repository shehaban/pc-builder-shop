"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { ScrollArea } from "@/components/ui/scroll-area"

export function CartSheet() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
              {itemCount}
            </Badge>
          )}
          <span className="sr-only">Shopping cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg font-semibold mb-2">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Add some products to get started</p>
          </div>
        ) : (
          <div className="flex flex-col h-[calc(100vh-120px)]">
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="h-20 w-20 rounded-lg bg-muted overflow-hidden shrink-0">
                      <img
                        src={item.image || `/placeholder.svg?height=80&width=80&query=${item.name}`}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm line-clamp-2">{item.name}</div>
                      <div className="text-xs text-muted-foreground mb-2">{item.brand}</div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 bg-transparent"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="font-semibold text-primary">${item.price * item.quantity}</div>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-2xl">${total.toLocaleString()}</span>
              </div>
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
