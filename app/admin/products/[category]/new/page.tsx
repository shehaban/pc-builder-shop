import { ProductForm } from "@/components/product-form"

export default async function NewCategoryProductPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New {category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        <p className="text-muted-foreground">Create a new product in the {category} category</p>
      </div>

      <div className="max-w-2xl">
        <ProductForm category={category} />
      </div>
    </div>
  )
}
