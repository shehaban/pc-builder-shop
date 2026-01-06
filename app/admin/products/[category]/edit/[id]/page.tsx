import { ProductForm } from "@/components/product-form"
import { notFound } from "next/navigation"
import fs from "fs/promises"
import path from "path"

async function getProduct(id: string) {
  try {
    const productsFile = path.join(process.cwd(), "database", "products.json")
    const data = await fs.readFile(productsFile, "utf-8")
    const products = JSON.parse(data)
    return products.find((p: any) => p.id === id)
  } catch (error) {
    console.error("Product fetch error:", error)
    return null
  }
}

export default async function EditProductPage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const { category, id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <p className="text-muted-foreground">Update product information</p>
      </div>

      <div className="max-w-2xl">
        <ProductForm product={product} category={category} />
      </div>
    </div>
  )
}
