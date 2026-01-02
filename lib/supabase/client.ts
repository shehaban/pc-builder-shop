import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  console.log("[v0] Environment check:", {
    hasProcessEnv: typeof process !== "undefined",
    hasEnv: typeof process !== "undefined" && process.env !== undefined,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    keyExists: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("[v0] Missing Supabase environment variables")
    throw new Error("Missing Supabase environment variables. Please check your project settings.")
  }

  console.log("[v0] Creating Supabase client with URL:", supabaseUrl)

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
