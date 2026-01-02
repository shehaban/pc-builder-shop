"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/lib/cart-context"

type ProductCardProps = {
  id: string
  name: string
  brand: string
  price: number
  image?: string
  rating?: number
  specs?: string[]
  inStock?: boolean
}

export function ProductCard({
  id,
  name,
  brand,
  price,
  image,
  rating = 4.5,
  specs = [],
  inStock = true,
}: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({ id, name, brand, price, image })
  }

  return (
    <Card className="overflow-hidden group hover:border-primary transition-all">
      {/* Image */}
      <div className="aspect-square bg-muted relative overflow-hidden">
        <img
          src={image || `/placeholder.svg?height=400&width=400&query=${name}`}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!inStock && (
          <Badge className="absolute top-2 right-2" variant="destructive">
            Out of Stock
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <div className="text-xs text-muted-foreground mb-1">{brand}</div>
          <h3 className="font-semibold text-base line-clamp-2">{name}</h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-xs text-muted-foreground">(127)</span>
        </div>

        {/* Specs */}
        {specs.length > 0 && (
          <div className="space-y-1">
            {specs.slice(0, 2).map((spec, i) => (
              <div key={i} className="text-xs text-muted-foreground">
                • {spec}
              </div>
            ))}
          </div>
        )}

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2">
          <div className="font-bold text-2xl text-primary">${price}</div>
          <Button size="sm" onClick={handleAddToCart} disabled={!inStock}>
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  )
}
