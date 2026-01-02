"use client"

import Link from "next/link"
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartSheet } from "@/components/cart-sheet"
import { UserNav } from "@/components/user-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">PC</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">BuildMart</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/builder" className="text-sm font-medium hover:text-primary transition-colors">
              PC Builder
            </Link>
            <Link href="/displays" className="text-sm font-medium hover:text-primary transition-colors">
              Displays
            </Link>
            <Link href="/peripherals" className="text-sm font-medium hover:text-primary transition-colors">
              Peripherals
            </Link>
            <Link href="/parts" className="text-sm font-medium hover:text-primary transition-colors">
              PC Parts
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <CartSheet />
            <UserNav />
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
