import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Monitor, Mouse, Cpu } from "lucide-react"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // Get product counts by category
  const { data: products } = await supabase.from("products").select("category")

  const displayCount = products?.filter((p) => p.category === "displays").length || 0
  const peripheralCount = products?.filter((p) => p.category === "peripherals").length || 0
  const partsCount = products?.filter((p) => p.category === "parts").length || 0
  const totalCount = products?.length || 0

  const stats = [
    { label: "Total Products", value: totalCount, icon: Package, color: "text-blue-600" },
    { label: "Displays", value: displayCount, icon: Monitor, color: "text-purple-600" },
    { label: "Peripherals", value: peripheralCount, icon: Mouse, color: "text-green-600" },
    { label: "PC Parts", value: partsCount, icon: Cpu, color: "text-orange-600" },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your PC parts store</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Use the navigation menu to manage products across different categories. You can add, edit, or remove
              products from your inventory.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
