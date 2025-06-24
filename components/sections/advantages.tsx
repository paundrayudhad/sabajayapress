import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Heart, Users } from "lucide-react"

const advantages = [
  {
    icon: Shield,
    title: "Terpercaya & Aman",
    description: "Transaksi aman dengan jaminan uang kembali",
  },
  {
    icon: Zap,
    title: "Akses Instan",
    description: "Download langsung setelah pembayaran",
  },
  {
    icon: Heart,
    title: "Kualitas Premium",
    description: "Buku berkualitas dari penerbit terpercaya",
  },
  {
    icon: Users,
    title: "Support 24/7",
    description: "Tim customer service siap membantu",
  },
]

export default function Advantages() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
            Mengapa SabaJayaPress?
          </h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Keunggulan yang membuat kami berbeda dari yang lain
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {advantages.map((advantage, index) => (
            <Card
              key={index}
              className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur"
            >
              <CardContent className="p-4 md:p-6 text-center">
                <div className="mx-auto h-10 w-10 md:h-12 md:w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3 md:mb-4">
                  <advantage.icon className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                </div>
                <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-900">{advantage.title}</h3>
                <p className="text-gray-600 text-sm">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
