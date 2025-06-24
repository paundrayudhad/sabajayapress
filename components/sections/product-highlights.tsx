import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const products = [
  {
    id: 1,
    title: "Panduan Lengkap JavaScript Modern",
    author: "Ahmad Rizki",
    price: 89000,
    originalPrice: 120000,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
    category: "Programming",
    isDigital: true,
  },
  {
    id: 2,
    title: "Strategi Bisnis Digital 2024",
    author: "Sari Indah",
    price: 150000,
    originalPrice: 200000,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    category: "Business",
    isDigital: false,
  },
  {
    id: 3,
    title: "Desain UI/UX untuk Pemula",
    author: "Budi Santoso",
    price: 75000,
    originalPrice: 100000,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    category: "Design",
    isDigital: true,
  },
  {
    id: 4,
    title: "Investasi Saham untuk Milenial",
    author: "Maya Putri",
    price: 95000,
    originalPrice: 130000,
    rating: 4.6,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=400&fit=crop",
    category: "Finance",
    isDigital: false,
  },
]

export default function ProductHighlights() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
            Buku Pilihan Terbaik
          </h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Koleksi buku terpopuler dan terlaris dari berbagai kategori
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md h-full flex flex-col"
            >
              <CardContent className="p-3 md:p-4 flex-1">
                <div className="relative mb-3 md:mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    width={200}
                    height={280}
                    className="w-full h-40 md:h-48 object-cover rounded-lg"
                  />
                  <Badge
                    className="absolute top-2 right-2 text-xs"
                    variant={product.isDigital ? "default" : "secondary"}
                  >
                    {product.isDigital ? "Digital" : "Fisik"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">oleh {product.author}</p>

                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs md:text-sm font-medium">{product.rating}</span>
                    <span className="text-xs md:text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm md:text-lg font-bold text-blue-600">
                      Rp {product.price.toLocaleString("id-ID")}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 line-through">
                      Rp {product.originalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-3 md:p-4 pt-0">
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-xs md:text-sm"
                  size="sm"
                  asChild
                >
                  <Link href={`/katalog/${product.id}`}>
                    <ShoppingCart className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                    Lihat Detail
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-10">
          <Button size="lg" variant="outline" asChild className="border-blue-200 text-blue-600 hover:bg-blue-50">
            <Link href="/katalog">Lihat Semua Produk</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
