"use client"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"

// Mock product data
const product = {
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
  description:
    "Buku panduan lengkap untuk mempelajari JavaScript modern dari dasar hingga mahir. Cocok untuk pemula maupun developer yang ingin meningkatkan skill JavaScript mereka.",
  features: [
    "ES6+ Features",
    "Async/Await Programming",
    "DOM Manipulation",
    "API Integration",
    "Modern Frameworks",
    "Best Practices",
  ],
  tableOfContents: [
    "Pengenalan JavaScript",
    "Variabel dan Tipe Data",
    "Function dan Scope",
    "Object dan Array",
    "Asynchronous Programming",
    "DOM dan Event Handling",
    "Modern JavaScript (ES6+)",
    "Framework dan Library",
  ],
  specifications: {
    pages: 350,
    language: "Bahasa Indonesia",
    format: "PDF",
    size: "15 MB",
    published: "2024",
  },
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()

  const handleBuyNow = () => {
    if (!user) {
      router.push("/login")
      return
    }
    // Redirect to checkout page
    router.push(`/checkout/${product.id}`)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/katalog" className="hover:text-blue-600">
            Katalog
          </Link>
          <span>/</span>
          <Link href={`/katalog?category=${product.category}`} className="hover:text-blue-600">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </div>

        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                width={300}
                height={400}
                className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
              />
              {/* Badge moved outside image */}
              <div className="flex justify-center mt-4">
                <Badge variant={product.isDigital ? "default" : "secondary"} className="text-sm px-4 py-2">
                  {product.isDigital ? "📱 Buku Digital" : "📚 Buku Fisik"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-lg text-muted-foreground">oleh {product.author}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} ulasan)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-2xl md:text-3xl font-bold text-blue-600">
                  Rp {product.price.toLocaleString("id-ID")}
                </span>
                <span className="text-lg md:text-xl text-muted-foreground line-through">
                  Rp {product.originalPrice.toLocaleString("id-ID")}
                </span>
                <Badge variant="secondary" className="text-green-600">
                  Hemat {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </Badge>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Yang Akan Anda Pelajari:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t">
              <Button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-lg py-6"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Beli Sekarang
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Deskripsi</TabsTrigger>
              <TabsTrigger value="contents">Daftar Isi</TabsTrigger>
              <TabsTrigger value="specifications">Spesifikasi</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Tentang Buku Ini</h3>
                  <div className="prose max-w-none">
                    <p className="text-muted-foreground leading-relaxed mb-4">{product.description}</p>
                    <p className="text-muted-foreground leading-relaxed">
                      Buku ini dirancang khusus untuk membantu Anda menguasai JavaScript modern dengan pendekatan yang
                      praktis dan mudah dipahami. Setiap konsep dijelaskan dengan contoh kode yang relevan dan dapat
                      langsung dipraktikkan.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contents" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Daftar Isi</h3>
                  <div className="space-y-2">
                    {product.tableOfContents.map((chapter, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 py-2 border-b border-border last:border-0"
                      >
                        <span className="text-sm font-medium text-blue-600">Bab {index + 1}</span>
                        <span className="text-muted-foreground">{chapter}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Spesifikasi Buku</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Jumlah Halaman:</span>
                        <span className="font-medium">{product.specifications.pages}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bahasa:</span>
                        <span className="font-medium">{product.specifications.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Format:</span>
                        <span className="font-medium">{product.specifications.format}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ukuran File:</span>
                        <span className="font-medium">{product.specifications.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tahun Terbit:</span>
                        <span className="font-medium">{product.specifications.published}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
