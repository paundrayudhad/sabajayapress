import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Download, Package, Zap } from "lucide-react"

const pricingPlans = [
  {
    name: "Buku Digital",
    description: "Format PDF berkualitas tinggi",
    price: "Mulai 25rb",
    icon: Download,
    features: ["Download langsung", "Format PDF HD", "Akses selamanya", "Bookmark & highlight"],
    popular: false,
  },
  {
    name: "Buku Fisik",
    description: "Buku cetak premium",
    price: "Mulai 75rb",
    icon: Package,
    features: ["Kualitas cetak premium", "Kertas berkualitas", "Pengiriman cepat", "Packaging aman"],
    popular: true,
  },
  {
    name: "Bundle Digital + Fisik",
    description: "Kombinasi terbaik",
    price: "Mulai 85rb",
    icon: Zap,
    features: ["Digital + fisik", "Hemat 15-20%", "Akses instan", "Bonus konten"],
    popular: false,
  },
]

export default function Pricing() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900">Pilihan Harga Terjangkau</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Pilih format yang sesuai dengan kebutuhan Anda</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-0 shadow-md hover:shadow-lg transition-all duration-300 ${plan.popular ? "ring-2 ring-blue-500 scale-105" : ""} bg-white`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                  Paling Populer
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                  <plan.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">{plan.name}</CardTitle>
                <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                <div className="mt-3">
                  <span className="text-2xl font-bold text-blue-600">{plan.price}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  variant={plan.popular ? "default" : "outline"}
                >
                  Lihat Katalog {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-gray-600 mb-4">Semua pembelian dilindungi garansi 30 hari uang kembali</p>
        </div>
      </div>
    </section>
  )
}
