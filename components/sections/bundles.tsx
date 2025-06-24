import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package, BookOpen, Gift } from "lucide-react"

const bundles = [
  {
    id: 1,
    title: "Programming Starter",
    description: "Paket lengkap untuk programmer pemula",
    items: ["JavaScript Fundamentals", "HTML & CSS Mastery", "React.js Guide", "Node.js Backend"],
    originalPrice: 450000,
    bundlePrice: 299000,
    savings: 151000,
    icon: Package,
    popular: true,
  },
  {
    id: 2,
    title: "Business Growth",
    description: "Strategi lengkap mengembangkan bisnis",
    items: ["Digital Marketing", "Financial Management", "Leadership Guide", "E-commerce Mastery"],
    originalPrice: 520000,
    bundlePrice: 349000,
    savings: 171000,
    icon: Gift,
    popular: false,
  },
  {
    id: 3,
    title: "Creative Design",
    description: "Panduan lengkap untuk desainer",
    items: ["UI/UX Principles", "Adobe Creative Suite", "Brand Identity", "Portfolio Building"],
    originalPrice: 380000,
    bundlePrice: 249000,
    savings: 131000,
    icon: BookOpen,
    popular: false,
  },
]

export default function Bundles() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900">Paket Bundle Hemat</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Dapatkan lebih banyak buku dengan harga lebih hemat
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {bundles.map((bundle) => (
            <Card
              key={bundle.id}
              className={`relative border-0 shadow-md hover:shadow-lg transition-all duration-300 ${bundle.popular ? "ring-2 ring-blue-500 scale-105" : ""} bg-white`}
            >
              {bundle.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                  Paling Populer
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <bundle.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">{bundle.title}</CardTitle>
                <p className="text-sm text-gray-600 mt-2">{bundle.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {bundle.items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">
                        Rp {bundle.bundlePrice.toLocaleString("id-ID")}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        Rp {bundle.originalPrice.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <Badge variant="secondary" className="text-green-600 bg-green-50">
                      Hemat Rp {bundle.savings.toLocaleString("id-ID")}
                    </Badge>
                  </div>

                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    variant={bundle.popular ? "default" : "outline"}
                  >
                    Beli Bundle Ini
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
