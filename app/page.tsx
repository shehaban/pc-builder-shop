import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Monitor, Keyboard, Cpu, Wrench, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="font-bold text-5xl sm:text-6xl lg:text-7xl text-balance mb-6">Build Your Perfect PC</h1>
            <p className="text-xl sm:text-2xl text-muted-foreground text-pretty mb-8">
              Premium components, expert guidance, and powerful tools to create the computer of your dreams.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="text-lg h-12 px-8">
                <Link href="/builder">
                  Start Building <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg h-12 px-8 bg-transparent">
                <Link href="/parts">Browse Parts</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our curated selection of premium PC components and peripherals
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/builder" className="group">
            <Card className="p-8 text-center hover:border-primary transition-all">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Wrench className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">PC Builder</h3>
              <p className="text-sm text-muted-foreground">Configure your dream build with compatibility checking</p>
            </Card>
          </Link>

          <Link href="/displays" className="group">
            <Card className="p-8 text-center hover:border-primary transition-all">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Monitor className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Displays</h3>
              <p className="text-sm text-muted-foreground">High refresh gaming and professional monitors</p>
            </Card>
          </Link>

          <Link href="/peripherals" className="group">
            <Card className="p-8 text-center hover:border-primary transition-all">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Keyboard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Peripherals</h3>
              <p className="text-sm text-muted-foreground">Keyboards, mice, headsets, and more</p>
            </Card>
          </Link>

          <Link href="/parts" className="group">
            <Card className="p-8 text-center hover:border-primary transition-all">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Cpu className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">PC Parts</h3>
              <p className="text-sm text-muted-foreground">CPUs, GPUs, RAM, storage, and components</p>
            </Card>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="h-12 w-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Compatibility Guaranteed</h3>
              <p className="text-sm text-muted-foreground">
                Our builder automatically checks compatibility between components
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">Only the best brands and latest technology</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Support</h3>
              <p className="text-sm text-muted-foreground">Our team is here to help with any questions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
