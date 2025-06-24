import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Users, Award } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container py-12 md:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 md:mb-8">
            Temukan Buku
            <span className="text-blue-600"> Digital & Fisik</span>
            <br />
            Berkualitas Tinggi
          </h1>
          <p className="mx-auto mt-4 md:mt-6 max-w-3xl text-base md:text-lg lg:text-xl leading-7 md:leading-8 text-gray-600 px-4">
            SabaJayaPress adalah platform terpercaya untuk membeli buku digital dan fisik dengan koleksi lengkap dan
            kualitas terbaik. Dapatkan akses instan ke ribuan judul buku.
          </p>
          <div className="mt-8 md:mt-12 flex items-center justify-center">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
            >
              <Link href="/katalog">
                Jelajahi Katalog
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </Button>
          </div>
          <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-4 md:p-6 rounded-2xl bg-white/50 backdrop-blur">
              <div className="mx-auto h-12 w-12 md:h-14 md:w-14 rounded-full bg-blue-100 flex items-center justify-center mb-3 md:mb-4">
                <BookOpen className="h-6 w-6 md:h-7 md:w-7 text-blue-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">10,000+</h3>
              <p className="text-sm md:text-base text-gray-600">Koleksi Buku Lengkap</p>
            </div>
            <div className="text-center p-4 md:p-6 rounded-2xl bg-white/50 backdrop-blur">
              <div className="mx-auto h-12 w-12 md:h-14 md:w-14 rounded-full bg-green-100 flex items-center justify-center mb-3 md:mb-4">
                <Users className="h-6 w-6 md:h-7 md:w-7 text-green-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">50,000+</h3>
              <p className="text-sm md:text-base text-gray-600">Pelanggan Puas</p>
            </div>
            <div className="text-center p-4 md:p-6 rounded-2xl bg-white/50 backdrop-blur">
              <div className="mx-auto h-12 w-12 md:h-14 md:w-14 rounded-full bg-purple-100 flex items-center justify-center mb-3 md:mb-4">
                <Award className="h-6 w-6 md:h-7 md:w-7 text-purple-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">4.9/5</h3>
              <p className="text-sm md:text-base text-gray-600">Rating Pelanggan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
