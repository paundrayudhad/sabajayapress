"use client"

import { useState } from "react"
import { Link, usePage } from "@inertiajs/react"

export default function AppLayout({ children }) {
  const { auth, flash } = usePage().props
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Beranda", href: "/" },
    { name: "Katalog", href: "/books" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Kontak", href: "/contact" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-20 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="h-8 w-8 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <svg className="h-4 w-4 md:h-6 md:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg md:text-2xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  SabaJayaPress
                </span>
                <span className="text-xs text-gray-500 hidden md:block">Penerbit Terpercaya</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-blue-600 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {auth?.user ? (
                <div className="relative">
                  <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={auth.user.avatar_url || "/placeholder.svg"}
                      alt={auth.user.name}
                    />
                    <span>{auth.user.name}</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Daftar
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
                {!auth?.user && (
                  <>
                    <Link
                      href="/login"
                      className="block px-3 py-2 text-base font-medium text-blue-600 hover:bg-gray-50"
                    >
                      Masuk
                    </Link>
                    <Link
                      href="/register"
                      className="block px-3 py-2 text-base font-medium text-white bg-blue-600 rounded-lg mx-3"
                    >
                      Daftar
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SJ</span>
                </div>
                <span className="font-bold text-xl">SabaJayaPress</span>
              </div>
              <p className="text-sm text-gray-600">
                Platform terpercaya untuk membeli buku digital dan fisik berkualitas tinggi dengan koleksi lengkap dari
                berbagai kategori.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Tautan Cepat</h3>
              <ul className="space-y-2 text-sm">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-600 hover:text-blue-600">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="font-semibold">Kategori</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/books?category=programming" className="text-gray-600 hover:text-blue-600">
                    Programming
                  </Link>
                </li>
                <li>
                  <Link href="/books?category=business" className="text-gray-600 hover:text-blue-600">
                    Bisnis
                  </Link>
                </li>
                <li>
                  <Link href="/books?category=design" className="text-gray-600 hover:text-blue-600">
                    Design
                  </Link>
                </li>
                <li>
                  <Link href="/books?category=marketing" className="text-gray-600 hover:text-blue-600">
                    Marketing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h3 className="font-semibold">Hubungi Kami</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-600">info@sabajayapress.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-600">+62 812-3456-7890</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-600">© 2024 SabaJayaPress. All rights reserved.</p>
              <div className="flex space-x-6 text-sm">
                <Link href="/terms" className="text-gray-600 hover:text-blue-600">
                  Syarat & Ketentuan
                </Link>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
                  Kebijakan Privasi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
