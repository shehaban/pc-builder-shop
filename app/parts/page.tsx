"use client"

import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SlidersHorizontal } from "lucide-react"

const parts = [
  {
    id: "1",
    name: "Intel Core i9-14900K Processor",
    brand: "Intel",
    price: 589,
    rating: 4.9,
    specs: ["24 cores", "5.8GHz boost", "LGA 1700"],
    inStock: true,
  },
  {
    id: "2",
    name: "NVIDIA GeForce RTX 4090 Graphics Card",
    brand: "NVIDIA",
    price: 1599,
    rating: 4.9,
    specs: ["24GB GDDR6X", "16384 CUDA cores", "450W TDP"],
    inStock: true,
  },
  {
    id: "3",
    name: "Corsair Vengeance DDR5 RAM 32GB",
    brand: "Corsair",
    price: 189,
    rating: 4.7,
    specs: ["32GB (2x16GB)", "6000MHz", "DDR5"],
    inStock: true,
  },
  {
    id: "4",
    name: "Samsung 990 Pro NVMe SSD 2TB",
    brand: "Samsung",
    price: 159,
    rating: 4.8,
    specs: ["2TB capacity", "7450MB/s read", "NVMe PCIe 4.0"],
    inStock: true,
  },
  {
    id: "5",
    name: "ASUS ROG STRIX Z790-E Gaming Motherboard",
    brand: "ASUS",
    price: 499,
    rating: 4.6,
    specs: ["LGA 1700", "DDR5", "WiFi 6E"],
    inStock: true,
  },
  {
    id: "6",
    name: "Corsair RM1000x 1000W PSU",
    brand: "Corsair",
    price: 179,
    rating: 4.8,
    specs: ["1000W", "80+ Gold", "Fully modular"],
    inStock: false,
  },
]

const brands = [
  { label: "Intel", value: "intel", count: 8 },
  { label: "AMD", value: "amd", count: 10 },
  { label: "NVIDIA", value: "nvidia", count: 12 },
  { label: "Corsair", value: "corsair", count: 20 },
  { label: "Samsung", value: "samsung", count: 15 },
  { label: "ASUS", value: "asus", count: 18 },
]

export default function PartsPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-bold text-3xl sm:text-4xl mb-2">PC Parts</h1>
          <p className="text-muted-foreground">Premium components for your custom build</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="cpu">CPUs</TabsTrigger>
            <TabsTrigger value="gpu">GPUs</TabsTrigger>
            <TabsTrigger value="ram">Memory</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="motherboard">Motherboards</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">{parts.length} products</p>
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
              {parts.map((part) => (
                <ProductCard key={part.id} {...part} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
