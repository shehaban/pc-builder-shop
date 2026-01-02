"use client"

import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SlidersHorizontal } from "lucide-react"

const peripherals = [
  {
    id: "1",
    name: "Logitech G Pro X Superlight Wireless Gaming Mouse",
    brand: "Logitech",
    price: 159,
    rating: 4.8,
    specs: ["25,600 DPI", "Wireless", "63g weight"],
    inStock: true,
  },
  {
    id: "2",
    name: "Razer BlackWidow V4 Mechanical Gaming Keyboard",
    brand: "Razer",
    price: 229,
    rating: 4.7,
    specs: ["Mechanical switches", "RGB lighting", "Full size"],
    inStock: true,
  },
  {
    id: "3",
    name: "SteelSeries Arctis Nova Pro Wireless Headset",
    brand: "SteelSeries",
    price: 349,
    rating: 4.9,
    specs: ["Wireless", "Active noise cancellation", "38 hour battery"],
    inStock: true,
  },
  {
    id: "4",
    name: "Corsair K70 RGB TKL Mechanical Keyboard",
    brand: "Corsair",
    price: 169,
    rating: 4.6,
    specs: ["Cherry MX switches", "Tenkeyless", "RGB"],
    inStock: true,
  },
  {
    id: "5",
    name: "HyperX Cloud Alpha Wireless Gaming Headset",
    brand: "HyperX",
    price: 199,
    rating: 4.5,
    specs: ["300 hour battery", "DTS:X", "Wireless"],
    inStock: true,
  },
  {
    id: "6",
    name: "Razer DeathAdder V3 Pro Wireless Mouse",
    brand: "Razer",
    price: 149,
    rating: 4.7,
    specs: ["30,000 DPI", "Wireless", "Ergonomic"],
    inStock: false,
  },
]

const brands = [
  { label: "Logitech", value: "logitech", count: 15 },
  { label: "Razer", value: "razer", count: 18 },
  { label: "Corsair", value: "corsair", count: 12 },
  { label: "SteelSeries", value: "steelseries", count: 10 },
  { label: "HyperX", value: "hyperx", count: 8 },
]

export default function PeripheralsPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-bold text-3xl sm:text-4xl mb-2">Peripherals</h1>
          <p className="text-muted-foreground">Premium gaming and professional peripherals</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mice">Mice</TabsTrigger>
            <TabsTrigger value="keyboards">Keyboards</TabsTrigger>
            <TabsTrigger value="headsets">Headsets</TabsTrigger>
            <TabsTrigger value="webcams">Webcams</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">{peripherals.length} products</p>
          <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block">
            <ProductFilters brands={brands} priceRange={[0, 500]} />
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {peripherals.map((peripheral) => (
                <ProductCard key={peripheral.id} {...peripheral} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
