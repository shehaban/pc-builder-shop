import { ProductForm } from "@/components/product-form"

export default function NewProductPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <p className="text-muted-foreground">Create a new product in your inventory</p>
      </div>

      <div className="max-w-2xl">
        <ProductForm />
      </div>
    </div>
  )
}
