"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Cpu as Gpu,
  Box,
  Power,
  CircuitBoard,
  Fan,
  AlertCircle,
  CheckCircle2,
} from "lucide-react"

type Component = {
  id: string
  name: string
  brand: string
  price: number
  specs: string
  socket?: string
  tdp?: number
  formFactor?: string
  image?: string
}

type ComponentCategory = {
  id: string
  name: string
  icon: React.ElementType
  required: boolean
  items: Component[]
}

const components: ComponentCategory[] = [
  {
    id: "cpu",
    name: "Processor",
    icon: Cpu,
    required: true,
    items: [
      {
        id: "cpu1",
        name: "Intel Core i9-14900K",
        brand: "Intel",
        price: 589,
        specs: "24 cores, 5.8GHz boost",
        socket: "LGA1700",
        tdp: 125,
      },
      {
        id: "cpu2",
        name: "AMD Ryzen 9 7950X",
        brand: "AMD",
        price: 549,
        specs: "16 cores, 5.7GHz boost",
        socket: "AM5",
        tdp: 170,
      },
      {
        id: "cpu3",
        name: "Intel Core i7-14700K",
        brand: "Intel",
        price: 409,
        specs: "20 cores, 5.6GHz boost",
        socket: "LGA1700",
        tdp: 125,
      },
      {
        id: "cpu4",
        name: "AMD Ryzen 7 7800X3D",
        brand: "AMD",
        price: 449,
        specs: "8 cores, 96MB cache",
        socket: "AM5",
        tdp: 120,
      },
    ],
  },
  {
    id: "motherboard",
    name: "Motherboard",
    icon: CircuitBoard,
    required: true,
    items: [
      {
        id: "mb1",
        name: "ASUS ROG STRIX Z790-E",
        brand: "ASUS",
        price: 499,
        specs: "DDR5, WiFi 6E",
        socket: "LGA1700",
        formFactor: "ATX",
      },
      {
        id: "mb2",
        name: "MSI MPG X670E",
        brand: "MSI",
        price: 449,
        specs: "DDR5, PCIe 5.0",
        socket: "AM5",
        formFactor: "ATX",
      },
      {
        id: "mb3",
        name: "Gigabyte Z790 AORUS",
        brand: "Gigabyte",
        price: 379,
        specs: "DDR5, WiFi 6",
        socket: "LGA1700",
        formFactor: "ATX",
      },
      {
        id: "mb4",
        name: "ASRock B650E Steel Legend",
        brand: "ASRock",
        price: 299,
        specs: "DDR5, PCIe 5.0",
        socket: "AM5",
        formFactor: "ATX",
      },
    ],
  },
  {
    id: "gpu",
    name: "Graphics Card",
    icon: Gpu,
    required: true,
    items: [
      { id: "gpu1", name: "RTX 4090", brand: "NVIDIA", price: 1599, specs: "24GB GDDR6X", tdp: 450 },
      { id: "gpu2", name: "RTX 4080 Super", brand: "NVIDIA", price: 999, specs: "16GB GDDR6X", tdp: 320 },
      { id: "gpu3", name: "RX 7900 XTX", brand: "AMD", price: 899, specs: "24GB GDDR6", tdp: 355 },
      { id: "gpu4", name: "RTX 4070 Ti Super", brand: "NVIDIA", price: 799, specs: "16GB GDDR6X", tdp: 285 },
    ],
  },
  {
    id: "ram",
    name: "Memory",
    icon: MemoryStick,
    required: true,
    items: [
      { id: "ram1", name: "Corsair Vengeance", brand: "Corsair", price: 189, specs: "32GB DDR5-6000" },
      { id: "ram2", name: "G.Skill Trident Z5", brand: "G.Skill", price: 159, specs: "32GB DDR5-5600" },
      { id: "ram3", name: "Kingston Fury Beast", brand: "Kingston", price: 139, specs: "32GB DDR5-5200" },
      { id: "ram4", name: "Corsair Dominator", brand: "Corsair", price: 249, specs: "32GB DDR5-6400" },
    ],
  },
  {
    id: "storage",
    name: "Storage",
    icon: HardDrive,
    required: true,
    items: [
      { id: "ssd1", name: "Samsung 990 Pro", brand: "Samsung", price: 159, specs: "2TB NVMe, 7450MB/s" },
      { id: "ssd2", name: "WD Black SN850X", brand: "Western Digital", price: 179, specs: "2TB NVMe, 7300MB/s" },
      { id: "ssd3", name: "Crucial T700", brand: "Crucial", price: 199, specs: "2TB NVMe, 12400MB/s" },
      { id: "ssd4", name: "Samsung 980 Pro", brand: "Samsung", price: 129, specs: "1TB NVMe, 7000MB/s" },
    ],
  },
  {
    id: "case",
    name: "Case",
    icon: Box,
    required: true,
    items: [
      {
        id: "case1",
        name: "NZXT H9 Elite",
        brand: "NZXT",
        price: 169,
        specs: "Mid-tower, tempered glass",
        formFactor: "ATX",
      },
      {
        id: "case2",
        name: "Lian Li O11 Dynamic",
        brand: "Lian Li",
        price: 159,
        specs: "Mid-tower, dual chamber",
        formFactor: "ATX",
      },
      {
        id: "case3",
        name: "Fractal Torrent",
        brand: "Fractal",
        price: 189,
        specs: "Mid-tower, high airflow",
        formFactor: "ATX",
      },
      {
        id: "case4",
        name: "Corsair 5000D",
        brand: "Corsair",
        price: 149,
        specs: "Mid-tower, cable management",
        formFactor: "ATX",
      },
    ],
  },
  {
    id: "psu",
    name: "Power Supply",
    icon: Power,
    required: true,
    items: [
      { id: "psu1", name: "Corsair RM1000x", brand: "Corsair", price: 179, specs: "1000W, 80+ Gold", tdp: 1000 },
      { id: "psu2", name: "Seasonic Prime TX", brand: "Seasonic", price: 249, specs: "1000W, 80+ Titanium", tdp: 1000 },
      { id: "psu3", name: "EVGA SuperNOVA", brand: "EVGA", price: 159, specs: "850W, 80+ Gold", tdp: 850 },
      {
        id: "psu4",
        name: "be quiet! Dark Power",
        brand: "be quiet!",
        price: 199,
        specs: "850W, 80+ Platinum",
        tdp: 850,
      },
    ],
  },
  {
    id: "cooler",
    name: "CPU Cooler",
    icon: Fan,
    required: false,
    items: [
      { id: "cool1", name: "Noctua NH-D15", brand: "Noctua", price: 109, specs: "Dual tower, 140mm fans", tdp: 250 },
      { id: "cool2", name: "Corsair H150i Elite", brand: "Corsair", price: 189, specs: "360mm AIO, RGB", tdp: 300 },
      { id: "cool3", name: "Arctic Liquid Freezer II", brand: "Arctic", price: 139, specs: "280mm AIO", tdp: 280 },
      {
        id: "cool4",
        name: "be quiet! Dark Rock Pro 4",
        brand: "be quiet!",
        price: 89,
        specs: "Dual tower, silent",
        tdp: 250,
      },
    ],
  },
]

export default function PCBuilder() {
  const [selectedComponents, setSelectedComponents] = useState<Record<string, Component>>({})
  const { addItem } = useCart()
  const router = useRouter()

  const compatibilityIssues = useMemo(() => {
    const issues: string[] = []
    const cpu = selectedComponents.cpu
    const motherboard = selectedComponents.motherboard
    const gpu = selectedComponents.gpu
    const psu = selectedComponents.psu
    const cooler = selectedComponents.cooler
    const pcCase = selectedComponents.case

    // Check CPU socket compatibility
    if (cpu && motherboard && cpu.socket !== motherboard.socket) {
      issues.push(`CPU socket (${cpu.socket}) incompatible with motherboard (${motherboard.socket})`)
    }

    // Check power supply wattage
    if (cpu && gpu && psu) {
      const totalTDP = (cpu.tdp || 0) + (gpu.tdp || 0) + 100 // +100 for other components
      const psuWattage = psu.tdp || 0
      if (totalTDP > psuWattage * 0.8) {
        issues.push(`PSU may be underpowered. System TDP: ${totalTDP}W, PSU: ${psuWattage}W`)
      }
    }

    // Check cooler TDP
    if (cpu && cooler && cpu.tdp && cooler.tdp && cpu.tdp > cooler.tdp) {
      issues.push(`CPU cooler may not handle CPU TDP (${cpu.tdp}W vs ${cooler.tdp}W)`)
    }

    // Check case form factor
    if (motherboard && pcCase && motherboard.formFactor !== pcCase.formFactor) {
      issues.push(`Motherboard form factor may not fit in case`)
    }

    return issues
  }, [selectedComponents])

  const totalPrice = useMemo(() => {
    return Object.values(selectedComponents).reduce((sum, component) => sum + component.price, 0)
  }, [selectedComponents])

  const handleSelectComponent = (categoryId: string, component: Component) => {
    setSelectedComponents((prev) => ({
      ...prev,
      [categoryId]: component,
    }))
  }

  const handleRemoveComponent = (categoryId: string) => {
    setSelectedComponents((prev) => {
      const updated = { ...prev }
      delete updated[categoryId]
      return updated
    })
  }

  const selectedCount = Object.keys(selectedComponents).length
  const requiredCount = components.filter((c) => c.required).length
  const requiredSelected = components.filter((c) => c.required && selectedComponents[c.id]).length
  const isComplete = requiredSelected === requiredCount

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center space-y-4">
            <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-balance">Build Your Dream PC</h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Configure the perfect computer with real-time compatibility checking and pricing
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {compatibilityIssues.length > 0 && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-semibold mb-1">Compatibility Issues:</div>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {compatibilityIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Component Selection */}
          <div className="lg:col-span-2 space-y-6">
            {components.map((category) => {
              const Icon = category.icon
              const selected = selectedComponents[category.id]

              return (
                <Card key={category.id} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-lg">{category.name}</h2>
                        {category.required && (
                          <Badge variant="outline" className="text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                      {selected && <p className="text-sm text-muted-foreground">{selected.name}</p>}
                    </div>
                    {selected && (
                      <Badge className="ml-auto" variant="secondary">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Selected
                      </Badge>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {category.items.map((item) => {
                      const isSelected = selected?.id === item.id

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelectComponent(category.id, item)}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50 hover:bg-accent"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground">{item.brand}</div>
                            <div className="text-sm text-muted-foreground">{item.specs}</div>
                            <div className="text-lg font-semibold text-primary pt-1">${item.price}</div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="p-6">
                <h2 className="font-semibold text-xl mb-4">Your Build</h2>

                <div className="space-y-3 mb-6">
                  {components.map((category) => {
                    const selected = selectedComponents[category.id]
                    const Icon = category.icon

                    return (
                      <div key={category.id} className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded bg-muted flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          {selected ? (
                            <>
                              <div className="text-sm font-medium truncate">{selected.name}</div>
                              <div className="text-xs text-muted-foreground">${selected.price}</div>
                            </>
                          ) : (
                            <div className="text-sm text-muted-foreground">
                              {category.required ? "Required" : "Optional"} - {category.name.toLowerCase()}
                            </div>
                          )}
                        </div>
                        {selected && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveComponent(category.id)}
                            className="h-8 w-8 p-0"
                          >
                            ×
                          </Button>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="border-t border-border pt-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Required ({requiredSelected}/{requiredCount})
                      </span>
                      <span className="font-medium">{Math.round((requiredSelected / requiredCount) * 100)}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(requiredSelected / requiredCount) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-lg">Total</span>
                    <span className="font-bold text-3xl">${totalPrice.toLocaleString()}</span>
                  </div>

                  {compatibilityIssues.length === 0 && selectedCount > 2 && (
                    <div className="flex items-center gap-2 text-sm text-green-500">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>All components compatible</span>
                    </div>
                  )}

                   <Button
                     className="w-full"
                     size="lg"
                     disabled={!isComplete || compatibilityIssues.length > 0}
                      onClick={async () => {
                        await Promise.all(Object.values(selectedComponents).map(component =>
                          addItem({
                            id: component.id,
                            name: component.name,
                            brand: component.brand,
                            price: component.price,
                            image: component.image,
                          })
                        ))
                        router.push("/")
                      }}
                   >
                     {!isComplete
                       ? "Select All Required Parts"
                       : compatibilityIssues.length > 0
                         ? "Fix Compatibility Issues"
                         : "Add Build to Cart"}
                   </Button>

                   {isComplete && compatibilityIssues.length === 0 && (
                     <div className="text-xs text-center text-muted-foreground">Build is complete and compatible! Ready to add to cart.</div>
                   )}
                </div>
              </Card>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Card className="p-4">
                  <div className="text-2xl font-bold">{selectedCount}</div>
                  <div className="text-xs text-muted-foreground">Parts Selected</div>
                </Card>
                <Card className="p-4">
                  <div className="text-2xl font-bold">
                    {selectedCount > 0 ? `${Math.round((requiredSelected / requiredCount) * 100)}%` : "0%"}
                  </div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
