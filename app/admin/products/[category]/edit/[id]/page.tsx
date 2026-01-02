import { createClient } from "@/lib/supabase/server"
import { ProductForm } from "@/components/product-form"
import { notFound } from "next/navigation"

export default async function EditProductPage({ params }: { params: Promise<{ category: string; id: string }> }) {
  const { category, id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase.from("products").select("*").eq("id", id).single()

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
