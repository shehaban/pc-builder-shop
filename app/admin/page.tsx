export default async function AdminPage() {
  const response = await fetch("http://localhost:3000/api/products", { cache: "no-store" })
  const products = await response.json()

  const categories = [...new Set(products?.map((p: any) => p.category) || [])] as string[]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category: string) => (
          <div key={category} className="p-4 border rounded-lg">
            <h2 className="text-lg font-semibold capitalize">{category}</h2>
            <p className="text-sm text-muted-foreground">
              Manage {category} products
            </p>
            <a
              href={`/admin/products/${category}`}
              className="text-primary hover:underline"
            >
              View Products →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
