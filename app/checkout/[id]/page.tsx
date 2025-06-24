"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Building2, User, Mail, Phone, MapPin, ShoppingCart, Star, ArrowLeft } from "lucide-react"
import Image from "next/image"

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
  isDigital: true,
  category: "Programming",
}

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { toast } = useToast()

  const [paymentMethod, setPaymentMethod] = useState("manual")
  const [isLoading, setIsLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  })

  if (!user) {
    router.push("/login")
    return null
  }

  const handlePayment = async () => {
    setIsLoading(true)

    try {
      // Show processing page
      router.push(`/checkout/${product.id}/processing?method=${paymentMethod}`)
    } catch (error) {
      toast({
        title: "Terjadi kesalahan",
        description: "Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const adminFee = 2500
  const total = product.price + adminFee
  const discount = product.originalPrice - product.price

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-8">
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-muted-foreground">Selesaikan pembelian Anda dengan aman</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary - Redesigned */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Ringkasan Pesanan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Product Info */}
                  <div className="flex space-x-4">
                    <div className="relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        width={80}
                        height={120}
                        className="rounded-lg object-cover shadow-sm"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-sm leading-tight">{product.title}</h3>
                      <p className="text-xs text-muted-foreground">oleh {product.author}</p>
                      <div className="flex justify-center">
                        <Badge variant={product.isDigital ? "default" : "secondary"} className="text-xs">
                          {product.isDigital ? "📱 Digital" : "📚 Fisik"}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Harga Buku</span>
                      <span>Rp {product.price.toLocaleString("id-ID")}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Diskon</span>
                        <span>-Rp {discount.toLocaleString("id-ID")}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span>Biaya Admin</span>
                      <span>Rp {adminFee.toLocaleString("id-ID")}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Pembayaran</span>
                      <span className="text-blue-600">Rp {total.toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  {/* Savings Info */}
                  {discount > 0 && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-800 font-medium">
                        🎉 Anda menghemat Rp {discount.toLocaleString("id-ID")}!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Pembeli</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Nama Lengkap</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Nama lengkap"
                          value={customerInfo.name}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Email"
                          value={customerInfo.email}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Nomor Telepon</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="Nomor telepon"
                          value={customerInfo.phone}
                          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {!product.isDigital && (
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium mb-2 block">Alamat Pengiriman</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Textarea
                            placeholder="Alamat lengkap untuk pengiriman"
                            value={customerInfo.address}
                            onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                            className="pl-10"
                            rows={3}
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Metode Pembayaran</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="manual" className="flex items-center">
                        <Building2 className="mr-2 h-4 w-4" />
                        Transfer Bank
                      </TabsTrigger>
                      <TabsTrigger value="gateway" className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Payment Gateway
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="manual" className="mt-6">
                      <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                          <h4 className="font-semibold mb-3 text-blue-900">Transfer ke Rekening Berikut:</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-blue-700">Bank:</span>
                              <span className="font-medium">BCA</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-700">No. Rekening:</span>
                              <span className="font-medium font-mono">1234567890</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-700">Atas Nama:</span>
                              <span className="font-medium">SabaJayaPress</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-blue-700">Jumlah Transfer:</span>
                              <span className="font-bold text-blue-900">Rp {total.toLocaleString("id-ID")}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            📱 <strong>Setelah transfer:</strong> Kirim bukti pembayaran ke WhatsApp kami di{" "}
                            <a href="https://wa.me/6281234567890" className="font-medium underline">
                              +62 812-3456-7890
                            </a>
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="gateway" className="mt-6">
                      <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2 text-green-900">Pembayaran Online</h4>
                          <p className="text-sm text-green-700">
                            Bayar langsung menggunakan kartu kredit, debit, atau e-wallet dengan keamanan terjamin
                          </p>
                        </div>
                        <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                          <p className="text-sm text-orange-800">
                            ⚠️ <strong>Perhatian:</strong> Pembayaran akan otomatis dibatalkan jika tidak selesai dalam
                            15 menit
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <Button
                    onClick={handlePayment}
                    disabled={isLoading}
                    className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 py-6 text-lg font-semibold"
                  >
                    {isLoading ? "Memproses..." : `Bayar Sekarang - Rp ${total.toLocaleString("id-ID")}`}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Dengan melanjutkan, Anda menyetujui syarat dan ketentuan kami
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
