"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Mail, Phone, MapPin, Clock, MessageCircle, ChevronDown, Sparkles } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: "info@sabajayapress.com",
    description: "Kirim email untuk pertanyaan umum",
    color: "bg-blue-500",
  },
  {
    icon: Phone,
    title: "Telepon",
    details: "+62 812-3456-7890",
    description: "Hubungi kami untuk bantuan langsung",
    color: "bg-green-500",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    details: "+62 812-3456-7890",
    description: "Chat langsung via WhatsApp",
    color: "bg-emerald-500",
  },
  {
    icon: MapPin,
    title: "Alamat",
    details: "Jl. Sudirman No. 123, Jakarta Pusat",
    description: "Kunjungi kantor kami",
    color: "bg-purple-500",
  },
]

const faqItems = [
  {
    question: "Bagaimana cara download buku digital setelah pembelian?",
    answer:
      "Setelah pembayaran berhasil, Anda akan menerima email dengan link download. Anda juga bisa mengakses buku di menu History Pembelian di akun Anda.",
  },
  {
    question: "Berapa lama pengiriman buku fisik?",
    answer:
      "Pengiriman buku fisik memakan waktu 2-3 hari kerja untuk area Jabodetabek dan 3-5 hari kerja untuk luar kota.",
  },
  {
    question: "Apakah ada garansi uang kembali?",
    answer:
      "Ya, kami memberikan garansi uang kembali 30 hari untuk semua pembelian jika Anda tidak puas dengan produk kami.",
  },
  {
    question: "Bagaimana cara menjadi penulis partner?",
    answer:
      "Anda bisa mengirim proposal dan contoh karya ke email partnership@sabajayapress.com untuk bergabung sebagai penulis partner.",
  },
  {
    question: "Apakah bisa membeli dalam jumlah banyak untuk institusi?",
    answer:
      "Ya, kami menyediakan paket khusus untuk institusi pendidikan dan perusahaan. Hubungi tim sales kami untuk penawaran khusus.",
  },
  {
    question: "Format apa saja yang tersedia untuk buku digital?",
    answer:
      "Saat ini kami menyediakan format PDF berkualitas tinggi yang dapat dibaca di semua device. Format EPUB akan segera tersedia.",
  },
]

export default function KontakPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section - Compact */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 mb-6">
                <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-600">Hubungi Kami</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                Ada Pertanyaan?
                <br />
                <span className="text-blue-600">Kami Siap Membantu</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tim customer service kami siap membantu Anda 24/7. Jangan ragu untuk menghubungi kami melalui berbagai
                channel yang tersedia.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info - Compact Cards */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`mx-auto h-12 w-12 rounded-xl ${info.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-gray-900">{info.title}</h3>
                    <p className="font-medium mb-2 text-sm">{info.details}</p>
                    <p className="text-xs text-gray-600">{info.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Google Maps - Compact */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Lokasi Kantor Kami</h2>
              <p className="text-gray-600">Kunjungi kantor kami di Jakarta Pusat</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613!3d-6.1944491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sJl.%20Sudirman%2C%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sen!2sid!4v1635000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>
              <div className="text-center mt-4">
                <Button variant="outline" asChild>
                  <a
                    href="https://maps.google.com/?q=Jl.+Sudirman+No.+123,+Jakarta+Pusat"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Buka di Google Maps
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Office Hours & Quick Help - Side by Side */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-blue-600" />
                    Jam Operasional
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Senin - Jumat</span>
                    <span className="font-medium">09:00 - 18:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sabtu</span>
                    <span className="font-medium">09:00 - 15:00 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Minggu</span>
                    <span className="font-medium text-red-600">Tutup</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <p className="text-sm text-gray-600 text-center">
                      <strong>Customer Service Online:</strong> 24/7 melalui WhatsApp dan email
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Bantuan Cepat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4 text-green-600" />
                      Chat WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="mailto:info@sabajayapress.com">
                      <Mail className="mr-2 h-4 w-4 text-blue-600" />
                      Kirim Email
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="tel:+6281234567890">
                      <Phone className="mr-2 h-4 w-4 text-purple-600" />
                      Telepon Langsung
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section - Compact */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Pertanyaan yang Sering Diajukan</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Temukan jawaban untuk pertanyaan umum seputar layanan kami
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((item, index) => (
                <Card key={index} className="shadow-md">
                  <Collapsible open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors py-4">
                        <CardTitle className="flex items-center justify-between text-left">
                          <span className="text-base font-semibold text-gray-900">{item.question}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openItems.includes(index) ? "transform rotate-180" : ""
                            }`}
                          />
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0 pb-4">
                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">Tidak menemukan jawaban yang Anda cari?</p>
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                  Hubungi Customer Service
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
