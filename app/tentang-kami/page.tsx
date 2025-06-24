import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, Heart, BookOpen, Globe, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

const stats = [
  { label: "Buku Terjual", value: "100,000+", icon: BookOpen, color: "bg-blue-500" },
  { label: "Pelanggan Aktif", value: "50,000+", icon: Users, color: "bg-green-500" },
  { label: "Penulis Partner", value: "1,000+", icon: Award, color: "bg-purple-500" },
  { label: "Negara Terlayani", value: "15+", icon: Globe, color: "bg-orange-500" },
]

const team = [
  {
    name: "Ahmad Rizki",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    description: "Berpengalaman 10+ tahun di industri penerbitan digital",
    expertise: "Leadership & Strategy",
  },
  {
    name: "Sari Indah",
    role: "Head of Content",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    description: "Ahli kurasi konten dengan background sastra dan teknologi",
    expertise: "Content Curation",
  },
  {
    name: "Budi Santoso",
    role: "Head of Technology",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Software engineer dengan spesialisasi platform e-commerce",
    expertise: "Technology & Innovation",
  },
]

const values = [
  {
    icon: Target,
    title: "Misi Kami",
    description:
      "Menyediakan akses mudah dan terjangkau ke buku-buku berkualitas tinggi untuk semua kalangan, mendukung literasi digital Indonesia.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Heart,
    title: "Nilai Kami",
    description:
      "Integritas, kualitas, inovasi, dan komitmen untuk memberikan pengalaman terbaik bagi setiap pelanggan dan mitra penulis.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Award,
    title: "Visi Kami",
    description:
      "Menjadi platform penerbitan digital terdepan di Asia Tenggara yang menghubungkan penulis terbaik dengan pembaca di seluruh dunia.",
    gradient: "from-purple-500 to-indigo-500",
  },
]

export default function TentangKamiPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section - Modern Design */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50"></div>

          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 mb-8">
                <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-600">Tentang SabaJayaPress</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Membangun Masa Depan
                <br />
                <span className="text-blue-600">Literasi Digital</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
                SabaJayaPress didirikan dengan misi mulia untuk menyebarkan ilmu pengetahuan melalui buku-buku
                berkualitas tinggi yang mudah diakses oleh semua orang di era digital.
              </p>

              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full"
              >
                Jelajahi Katalog Kami
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section - Modern Cards */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`mx-auto h-16 w-16 rounded-2xl ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section - Modern Layout */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  Perjalanan Kami
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-blue-600">2020 - Awal Perjalanan</h3>
                    <p className="text-gray-600 leading-relaxed">
                      SabaJayaPress lahir dari keprihatinan akan sulitnya akses terhadap buku-buku berkualitas di
                      Indonesia. Di tengah pandemi yang mengubah cara kita belajar dan bekerja, kami melihat peluang
                      besar untuk menghadirkan solusi literasi digital yang inovatif.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-purple-600">2021-2023 - Pertumbuhan</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Dimulai dengan koleksi 100 buku digital, kini kami telah berkembang menjadi platform terpercaya
                      dengan lebih dari 10,000 judul buku dari berbagai kategori. Kami tidak hanya menyediakan buku
                      digital, tetapi juga buku fisik berkualitas premium.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold mb-4 text-green-600">2024 - Masa Depan</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Komitmen kami adalah terus berinovasi dalam menyajikan pengalaman membaca yang terbaik, mendukung
                      penulis lokal, dan berkontribusi dalam memajukan literasi bangsa. Setiap buku yang kami jual
                      adalah investasi untuk masa depan yang lebih cerdas.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl transform rotate-3"></div>
                  <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">4+ Tahun</div>
                      <div className="text-gray-600 mb-6">Melayani Indonesia</div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-purple-600">10K+</div>
                          <div className="text-sm text-gray-600">Judul Buku</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">50K+</div>
                          <div className="text-sm text-gray-600">Pembaca</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - Modern Cards */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                Nilai-Nilai Kami
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Prinsip-prinsip yang memandu setiap langkah perjalanan kami
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                >
                  <CardContent className="p-8 text-center relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>
                    <div
                      className={`relative mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section - Modern Design */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                Tim Hebat Kami
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Orang-orang luar biasa di balik kesuksesan SabaJayaPress
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={400}
                        height={400}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{member.name}</h3>
                      <p className="text-blue-600 font-semibold mb-2">{member.role}</p>
                      <Badge variant="outline" className="mb-3 text-xs">
                        {member.expertise}
                      </Badge>
                      <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Bergabunglah dengan Komunitas Pembaca Kami</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Dapatkan akses ke ribuan buku berkualitas dan jadilah bagian dari revolusi literasi digital Indonesia
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full"
              >
                Mulai Membaca Sekarang
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
