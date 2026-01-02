import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ProductTable } from "@/components/product-table"

export default async function PartsPage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", "parts")
    .order("created_at", { ascending: false })

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">PC Parts</h1>
          <p className="text-muted-foreground">Manage PC component products</p>
        </div>
        <Button asChild>
          <Link href="/admin/products/parts/new">
            <Plus className="mr-2 h-4 w-4" />
            Add PC Part
          </Link>
        </Button>
      </div>

      <ProductTable products={products || []} />
    </div>
  )
}
