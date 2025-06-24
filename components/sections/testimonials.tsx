"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Andi Pratama",
    role: "Software Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content:
      "SabaJayaPress benar-benar mengubah cara saya belajar programming. Buku-bukunya berkualitas tinggi dan selalu update dengan teknologi terbaru. Highly recommended!",
  },
  {
    name: "Sari Dewi",
    role: "Entrepreneur",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content:
      "Sebagai pebisnis, saya sangat terbantu dengan koleksi buku bisnis di SabaJayaPress. Formatnya praktis dan bisa dibaca kapan saja. Pelayanannya juga excellent!",
  },
  {
    name: "Budi Santoso",
    role: "UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 5,
    content:
      "Bundle design yang saya beli sangat worth it! Dapat 4 buku dengan harga yang sangat terjangkau. Materinya lengkap dan mudah dipahami.",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000) // Auto slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
            Apa Kata Pelanggan Kami?
          </h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Ribuan pelanggan telah merasakan manfaat berbelanja di SabaJayaPress
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
                    <CardContent className="p-6 md:p-8 text-center">
                      <Quote className="h-8 w-8 md:h-10 md:w-10 text-blue-600 mx-auto mb-4 md:mb-6" />

                      <div className="flex items-center justify-center space-x-1 mb-4 md:mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      <p className="text-gray-700 mb-6 md:mb-8 leading-relaxed text-sm md:text-base italic">
                        "{testimonial.content}"
                      </p>

                      <div className="flex items-center justify-center space-x-3 md:space-x-4">
                        <Avatar className="h-12 w-12 md:h-16 md:w-16">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <p className="font-semibold text-sm md:text-base text-gray-900">{testimonial.name}</p>
                          <p className="text-xs md:text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-6 md:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 md:h-3 md:w-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12">
          <p className="text-base md:text-lg font-semibold mb-2">Bergabunglah dengan 50,000+ pelanggan puas</p>
          <p className="text-sm md:text-base text-gray-600">Rating rata-rata 4.9/5 dari 10,000+ review</p>
        </div>
      </div>
    </section>
  )
}
