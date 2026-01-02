import type React from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user || user.user_metadata?.is_admin !== true) {
    redirect("/admin/login")
  }

  return (
    <div className="flex h-screen">
      <AdminNav />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
