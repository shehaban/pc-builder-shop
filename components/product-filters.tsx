"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

type FilterOption = {
  label: string
  value: string
  count?: number
}

type ProductFiltersProps = {
  brands?: FilterOption[]
  priceRange?: [number, number]
  onPriceChange?: (value: [number, number]) => void
}

export function ProductFilters({ brands = [], priceRange = [0, 2000], onPriceChange }: ProductFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Price Filter */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            defaultValue={priceRange}
            max={2000}
            step={50}
            onValueChange={(value) => onPriceChange?.(value as [number, number])}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </Card>

      {/* Brand Filter */}
      {brands.length > 0 && (
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Brand</h3>
          <div className="space-y-3">
            {brands.map((brand) => (
              <div key={brand.value} className="flex items-center space-x-2">
                <Checkbox id={brand.value} />
                <Label
                  htmlFor={brand.value}
                  className="text-sm font-normal cursor-pointer flex items-center justify-between flex-1"
                >
                  <span>{brand.label}</span>
                  {brand.count && <span className="text-muted-foreground">({brand.count})</span>}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Availability */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Availability</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" defaultChecked />
            <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
              In Stock
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="pre-order" />
            <Label htmlFor="pre-order" className="text-sm font-normal cursor-pointer">
              Pre-order
            </Label>
          </div>
        </div>
      </Card>
    </div>
  )
}
