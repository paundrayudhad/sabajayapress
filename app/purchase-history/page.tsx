"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { Download, BookOpen, Calendar } from "lucide-react"
import Image from "next/image"

// Mock purchase data
const purchases = [
  {
    id: 1,
    title: "Panduan Lengkap JavaScript Modern",
    author: "Ahmad Rizki",
    price: 89000,
    purchaseDate: "2024-01-15",
    type: "digital",
    status: "completed",
    downloadUrl: "/downloads/javascript-modern.pdf",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Strategi Bisnis Digital 2024",
    author: "Sari Indah",
    price: 150000,
    purchaseDate: "2024-01-10",
    type: "physical",
    status: "completed",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Desain UI/UX untuk Pemula",
    author: "Budi Santoso",
    price: 75000,
    purchaseDate: "2024-01-05",
    type: "digital",
    status: "completed",
    downloadUrl: "/downloads/ui-ux-pemula.pdf",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
  },
]

export default function PurchaseHistoryPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [filter, setFilter] = useState("all")

  if (!user) {
    router.push("/login")
    return null
  }

  const filteredPurchases = purchases.filter((purchase) => {
    if (filter === "all") return true
    return purchase.type === filter
  })

  const handleDownload = (downloadUrl: string, title: string) => {
    // Simulate PDF download
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = `${title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">History Pembelian</h1>
            <p className="text-muted-foreground">Lihat dan kelola semua buku yang telah Anda beli</p>
          </div>

          {/* Filter */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2">
                <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                  Semua
                </Button>
                <Button
                  variant={filter === "digital" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("digital")}
                >
                  Buku Digital
                </Button>
                <Button
                  variant={filter === "physical" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("physical")}
                >
                  Buku Fisik
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Purchase List */}
          <div className="space-y-4">
            {filteredPurchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Image
                      src={purchase.image || "/placeholder.svg"}
                      alt={purchase.title}
                      width={80}
                      height={120}
                      className="w-20 h-30 object-cover rounded-lg mx-auto md:mx-0"
                    />

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{purchase.title}</h3>
                          <p className="text-muted-foreground">oleh {purchase.author}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant={purchase.type === "digital" ? "default" : "secondary"}>
                              {purchase.type === "digital" ? "Digital" : "Fisik"}
                            </Badge>
                            <Badge variant="outline" className="text-green-600">
                              {purchase.status === "completed" ? "Selesai" : "Pending"}
                            </Badge>
                          </div>
                        </div>

                        <div className="text-right mt-4 md:mt-0">
                          <p className="font-bold text-lg">Rp {purchase.price.toLocaleString("id-ID")}</p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Calendar className="mr-1 h-4 w-4" />
                            {new Date(purchase.purchaseDate).toLocaleDateString("id-ID")}
                          </div>
                        </div>
                      </div>

                      {purchase.type === "digital" && purchase.downloadUrl && (
                        <div className="pt-4 border-t">
                          <Button
                            onClick={() => handleDownload(purchase.downloadUrl!, purchase.title)}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPurchases.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Belum ada pembelian</h3>
                <p className="text-muted-foreground mb-4">
                  Anda belum membeli buku apapun. Mulai jelajahi katalog kami!
                </p>
                <Button asChild>
                  <a href="/katalog">Jelajahi Katalog</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
