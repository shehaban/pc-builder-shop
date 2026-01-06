"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type CartItem = {
  id: string
  name: string
  brand: string
  price: number
  quantity: number
  image?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => Promise<void>
  removeItem: (id: string) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  total: number
  itemCount: number
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load cart from API on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await fetch("/api/cart")
        if (response.ok) {
          const cart = await response.json()
          setItems(cart)
        }
      } catch (error) {
        console.error("Failed to load cart:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadCart()
  }, [])

  const addItem = async (item: Omit<CartItem, "quantity">) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", item }),
      })
      if (response.ok) {
        const updatedCart = await response.json()
        setItems(updatedCart)
      }
    } catch (error) {
      console.error("Failed to add item:", error)
    }
  }

  const removeItem = async (id: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove", id }),
      })
      if (response.ok) {
        const updatedCart = await response.json()
        setItems(updatedCart)
      }
    } catch (error) {
      console.error("Failed to remove item:", error)
    }
  }

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update", id, quantity }),
      })
      if (response.ok) {
        const updatedCart = await response.json()
        setItems(updatedCart)
      }
    } catch (error) {
      console.error("Failed to update quantity:", error)
    }
  }

  const clearCart = async () => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clear" }),
      })
      if (response.ok) {
        const updatedCart = await response.json()
        setItems(updatedCart)
      }
    } catch (error) {
      console.error("Failed to clear cart:", error)
    }
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount, isLoading }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
