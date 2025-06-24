import Header from "@/components/layout/header"
import Hero from "@/components/sections/hero"
import Advantages from "@/components/sections/advantages"
import ProductHighlights from "@/components/sections/product-highlights"
import Bundles from "@/components/sections/bundles"
import Pricing from "@/components/sections/pricing"
import Testimonials from "@/components/sections/testimonials"
import Footer from "@/components/layout/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Advantages />
        <ProductHighlights />
        <Bundles />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}
