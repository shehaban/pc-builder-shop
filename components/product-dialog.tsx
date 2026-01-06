"use client"

import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Plus, Pencil } from "lucide-react"
import { ProductForm } from "@/components/product-form"

interface ProductDialogProps {
  product?: any
  category?: string
  trigger?: React.ReactNode
  onSuccess?: () => void
}

export function ProductDialog({ product, category, trigger, onSuccess }: ProductDialogProps) {
  const [open, setOpen] = useState(false)
  const isEditing = !!product

  const handleSuccess = async () => {
    setOpen(false)
    await onSuccess?.()
  }

  const defaultTrigger = isEditing ? (
    <Button size="sm" variant="outline">
      <Pencil className="h-4 w-4" />
    </Button>
  ) : (
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Add Product
    </Button>
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || defaultTrigger}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {isEditing ? "Edit Product" : "Add New Product"}
          </SheetTitle>
          <SheetDescription>
            {isEditing
              ? "Update the product information below."
              : "Fill in the details to create a new product."
            }
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <ProductForm
            product={product}
            category={category}
            onSuccess={handleSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}