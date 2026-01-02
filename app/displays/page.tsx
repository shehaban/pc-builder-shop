"use client"

import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"

const displays = [
  {
    id: "1",
    name: 'ASUS ROG Swift OLED 27" Gaming Monitor',
    brand: "ASUS",
    price: 899,
    rating: 4.8,
    specs: ["2560x1440", "240Hz", "0.03ms response"],
    inStock: true,
  },
  {
    id: "2",
    name: 'LG UltraGear 32" 4K Gaming Monitor',
    brand: "LG",
    price: 749,
    rating: 4.6,
    specs: ["3840x2160", "144Hz", "1ms response"],
    inStock: true,
  },
  {
    id: "3",
    name: 'Samsung Odyssey G9 49" Curved Gaming',
    brand: "Samsung",
    price: 1299,
    rating: 4.9,
    specs: ["5120x1440", "240Hz", "Curved"],
    inStock: true,
  },
  {
    id: "4",
    name: 'Dell UltraSharp 27" 4K Professional',
    brand: "Dell",
    price: 649,
    rating: 4.7,
    specs: ["3840x2160", "60Hz", "IPS panel"],
    inStock: true,
  },
  {
    id: "5",
    name: 'BenQ MOBIUZ 32" Gaming Monitor',
    brand: "BenQ",
    price: 549,
    rating: 4.5,
    specs: ["2560x1440", "165Hz", "HDR"],
    inStock: true,
  },
  {
    id: "6",
    name: 'Acer Predator 27" Gaming Monitor',
    brand: "Acer",
    price: 599,
    rating: 4.4,
    specs: ["2560x1440", "170Hz", "G-Sync"],
    inStock: false,
  },
]

const brands = [
  { label: "ASUS", value: "asus", count: 12 },
  { label: "LG", value: "lg", count: 8 },
  { label: "Samsung", value: "samsung", count: 10 },
  { label: "Dell", value: "dell", count: 6 },
  { label: "BenQ", value: "benq", count: 5 },
  { label: "Acer", value: "acer", count: 7 },
]

export default function DisplaysPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-bold text-3xl sm:text-4xl mb-2">Displays</h1>
          <p className="text-muted-foreground">High-performance monitors for gaming and productivity</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">{displays.length} products</p>
          <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block">
            <ProductFilters brands={brands} priceRange={[0, 2000]} />
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displays.map((display) => (
                <ProductCard key={display.id} {...display} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
