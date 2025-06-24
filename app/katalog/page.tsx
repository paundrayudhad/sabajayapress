"use client"

import { useState, useMemo } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Search, Filter, ShoppingCart } from "lucide-react"
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
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop",
    category: "Programming",
    isDigital: true,
    tags: ["JavaScript", "Web Development", "Frontend"],
  },
  {
    id: 2,
    title: "Strategi Bisnis Digital 2024",
    author: "Sari Indah",
    price: 150000,
    originalPrice: 200000,
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=300&fit=crop",
    category: "Business",
    isDigital: false,
    tags: ["Digital Marketing", "Strategy", "Business"],
  },
  {
    id: 3,
    title: "Desain UI/UX untuk Pemula",
    author: "Budi Santoso",
    price: 75000,
    originalPrice: 100000,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
    category: "Design",
    isDigital: true,
    tags: ["UI/UX", "Design", "Figma"],
  },
  {
    id: 4,
    title: "Investasi Saham untuk Milenial",
    author: "Maya Putri",
    price: 95000,
    originalPrice: 130000,
    rating: 4.6,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=300&fit=crop",
    category: "Finance",
    isDigital: false,
    tags: ["Investment", "Finance", "Stock"],
  },
  {
    id: 5,
    title: "Digital Marketing Mastery",
    author: "Andi Pratama",
    price: 120000,
    originalPrice: 160000,
    rating: 4.5,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=300&fit=crop",
    category: "Marketing",
    isDigital: true,
    tags: ["Marketing", "Digital", "Social Media"],
  },
  {
    id: 6,
    title: "Pengembangan Diri Sukses",
    author: "Rina Sari",
    price: 65000,
    originalPrice: 85000,
    rating: 4.4,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=300&fit=crop",
    category: "Self Development",
    isDigital: false,
    tags: ["Self Help", "Motivation", "Success"],
  },
]

const categories = ["Semua Kategori", "Programming", "Business", "Design", "Marketing", "Finance", "Self Development"]

const priceRanges = [
  { label: "Semua Harga", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "Di bawah Rp 50.000", min: 0, max: 50000 },
  { label: "Rp 50.000 - Rp 100.000", min: 50000, max: 100000 },
  { label: "Rp 100.000 - Rp 200.000", min: 100000, max: 200000 },
  { label: "Di atas Rp 200.000", min: 200000, max: Number.POSITIVE_INFINITY },
]

export default function KatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori")
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [showDigitalOnly, setShowDigitalOnly] = useState(false)
  const [showPhysicalOnly, setShowPhysicalOnly] = useState(false)
  const [sortBy, setSortBy] = useState("popular")

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch =
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.author.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCategory = selectedCategory === "Semua Kategori" || product.category === selectedCategory

        const matchesPrice = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max

        const matchesFormat =
          (!showDigitalOnly && !showPhysicalOnly) ||
          (showDigitalOnly && product.isDigital) ||
          (showPhysicalOnly && !product.isDigital)

        return matchesSearch && matchesCategory && matchesPrice && matchesFormat
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "rating":
            return b.rating - a.rating
          case "newest":
            return b.id - a.id
          default: // popular
            return b.reviews - a.reviews
        }
      })
  }, [searchQuery, selectedCategory, selectedPriceRange, showDigitalOnly, showPhysicalOnly, sortBy])

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Katalog Buku</h1>
          <p className="text-muted-foreground">Temukan buku yang Anda cari dari koleksi lengkap kami</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Cari Buku</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Judul atau penulis..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Kategori</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Rentang Harga</label>
                <Select
                  value={selectedPriceRange.label}
                  onValueChange={(value) => {
                    const range = priceRanges.find((r) => r.label === value)
                    if (range) setSelectedPriceRange(range)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.label} value={range.label}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Format Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Format</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="digital" checked={showDigitalOnly} onCheckedChange={setShowDigitalOnly} />
                    <label htmlFor="digital" className="text-sm">
                      Buku Digital
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="physical" checked={showPhysicalOnly} onCheckedChange={setShowPhysicalOnly} />
                    <label htmlFor="physical" className="text-sm">
                      Buku Fisik
                    </label>
                  </div>
                </div>
              </div>

              {/* Reset Filter Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("Semua Kategori")
                  setSelectedPriceRange(priceRanges[0])
                  setShowDigitalOnly(false)
                  setShowPhysicalOnly(false)
                  setSortBy("popular")
                }}
              >
                Reset Filter
              </Button>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort and Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                Menampilkan {filteredProducts.length} dari {products.length} buku
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Paling Populer</SelectItem>
                  <SelectItem value="newest">Terbaru</SelectItem>
                  <SelectItem value="price-low">Harga Terendah</SelectItem>
                  <SelectItem value="price-high">Harga Tertinggi</SelectItem>
                  <SelectItem value="rating">Rating Tertinggi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        width={200}
                        height={300}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      {/* Badge positioned at top-left of image */}
                      <Badge
                        variant={product.isDigital ? "default" : "secondary"}
                        className="absolute top-2 left-2 text-xs"
                      >
                        {product.isDigital ? "📱 Digital" : "📚 Fisik"}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {/* Category badge aligned to left */}
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">oleh {product.author}</p>

                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold">Rp {product.price.toLocaleString("id-ID")}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          Rp {product.originalPrice.toLocaleString("id-ID")}
                        </span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full" size="sm" asChild>
                      <Link href={`/katalog/${product.id}`}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Beli Sekarang
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Tidak ada buku yang sesuai dengan filter Anda</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("Semua Kategori")
                    setSelectedPriceRange(priceRanges[0])
                    setShowDigitalOnly(false)
                    setShowPhysicalOnly(false)
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
