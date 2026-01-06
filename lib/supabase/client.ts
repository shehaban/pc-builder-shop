import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = "https://dummy.supabase.co"
  const supabaseAnonKey = "dummy-anon-key"

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
