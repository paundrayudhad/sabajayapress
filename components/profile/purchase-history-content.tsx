"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Download, BookOpen, Calendar, Search } from "lucide-react"
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
    category: "Programming",
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
    category: "Business",
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
    category: "Design",
  },
]

export default function PurchaseHistoryContent() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesFilter = filter === "all" || purchase.type === filter
    const matchesSearch =
      purchase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleDownload = (downloadUrl: string, title: string) => {
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = `${title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            History Pembelian
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari buku atau penulis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                Semua
              </Button>
              <Button
                variant={filter === "digital" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("digital")}
              >
                Digital
              </Button>
              <Button
                variant={filter === "physical" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("physical")}
              >
                Fisik
              </Button>
            </div>
          </div>

          {/* Purchase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPurchases.map((purchase) => (
              <Card key={purchase.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={purchase.image || "/placeholder.svg"}
                    alt={purchase.title}
                    width={200}
                    height={280}
                    className="w-full h-48 object-cover"
                  />
                  <Badge
                    className="absolute top-2 right-2"
                    variant={purchase.type === "digital" ? "default" : "secondary"}
                  >
                    {purchase.type === "digital" ? "Digital" : "Fisik"}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs">
                      {purchase.category}
                    </Badge>
                    <h3 className="font-semibold text-sm line-clamp-2">{purchase.title}</h3>
                    <p className="text-xs text-muted-foreground">oleh {purchase.author}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(purchase.purchaseDate).toLocaleDateString("id-ID")}
                      </div>
                      <span className="font-bold text-blue-600">Rp {purchase.price.toLocaleString("id-ID")}</span>
                    </div>

                    {purchase.type === "digital" && purchase.downloadUrl && (
                      <Button
                        onClick={() => handleDownload(purchase.downloadUrl!, purchase.title)}
                        className="w-full mt-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                        size="sm"
                      >
                        <Download className="mr-2 h-3 w-3" />
                        Download PDF
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPurchases.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tidak ada pembelian ditemukan</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Coba kata kunci lain" : "Anda belum membeli buku apapun"}
              </p>
              {!searchQuery && (
                <Button asChild>
                  <a href="/katalog">Jelajahi Katalog</a>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
