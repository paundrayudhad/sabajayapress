"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2, MessageCircle, CreditCard, CheckCircle, XCircle } from "lucide-react"

export default function ProcessingPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [isProcessing, setIsProcessing] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<"processing" | "success" | "failed">("processing")
  const paymentMethod = searchParams.get("method") || "manual"

  useEffect(() => {
    // Simulate payment processing
    const timer = setTimeout(() => {
      setIsProcessing(false)

      if (paymentMethod === "gateway") {
        // 70% success rate for gateway
        const isSuccess = Math.random() > 0.3
        setPaymentStatus(isSuccess ? "success" : "failed")
      } else {
        // Manual payment always shows processing message
        setPaymentStatus("processing")
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [paymentMethod])

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      `Halo, saya sudah melakukan transfer untuk pembelian buku "Panduan Lengkap JavaScript Modern" dengan total Rp 91.500. Mohon konfirmasi pembayaran. Terima kasih.`,
    )
    window.open(`https://wa.me/6281234567890?text=${message}`, "_blank")
  }

  const handleViewPurchases = () => {
    router.push("/profile?tab=purchases")
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-12">
                <Loader2 className="h-16 w-16 animate-spin mx-auto mb-6 text-blue-600" />
                <h1 className="text-2xl font-bold mb-4">Memproses Pembayaran...</h1>
                <p className="text-muted-foreground">Mohon tunggu sebentar, kami sedang memproses pembayaran Anda.</p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (paymentMethod === "manual" || paymentStatus === "processing") {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-12">
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold mb-4 text-blue-600">Pembelian Anda Sedang Diproses</h1>
                <p className="text-muted-foreground mb-8">
                  Mohon lakukan pembayaran sesuai instruksi yang telah diberikan. Setelah transfer, silakan kirim bukti
                  pembayaran melalui WhatsApp untuk konfirmasi.
                </p>

                <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
                  <h3 className="font-semibold mb-4 text-blue-900">Detail Transfer:</h3>
                  <div className="space-y-2 text-sm text-left">
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
                      <span className="font-bold text-blue-900">Rp 91.500</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleWhatsAppRedirect}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Kirim Bukti via WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-12">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold mb-4 text-green-600">Pembayaran Berhasil! 🎉</h1>
                <p className="text-muted-foreground mb-8">
                  Anda telah berhasil melakukan pembayaran. Yuk lihat ebook yang kamu beli dan mulai membaca sekarang!
                </p>

                <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-8">
                  <h3 className="font-semibold mb-2 text-green-900">Ebook Siap Didownload!</h3>
                  <p className="text-sm text-green-700">
                    Buku digital Anda sudah tersedia di menu History Pembelian. Anda dapat mengunduh dan membaca kapan
                    saja.
                  </p>
                </div>

                <Button
                  onClick={handleViewPurchases}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
                >
                  Lihat Ebook Saya
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (paymentStatus === "failed") {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-16">
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-12">
                <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold mb-4 text-red-600">Pembayaran Gagal ❌</h1>
                <p className="text-muted-foreground mb-8">
                  Pembayaran gagal karena batas waktu terlampaui. Silakan coba lagi atau gunakan metode pembayaran lain.
                </p>

                <div className="space-y-4">
                  <Button
                    onClick={() => router.push(`/checkout/${params.id}`)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 w-full"
                  >
                    Coba Lagi
                  </Button>

                  <Button onClick={handleWhatsAppRedirect} variant="outline" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Hubungi Customer Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return null
}
