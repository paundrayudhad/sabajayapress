import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SJ</span>
              </div>
              <span className="font-bold text-xl">SabaJayaPress</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Platform terpercaya untuk membeli buku digital dan fisik berkualitas tinggi dengan koleksi lengkap dari
              berbagai kategori.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/katalog" className="text-muted-foreground hover:text-primary">
                  Katalog
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="text-muted-foreground hover:text-primary">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/kontak" className="text-muted-foreground hover:text-primary">
                  Kontak
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/kebijakan-privasi" className="text-muted-foreground hover:text-primary">
                  Kebijakan Privasi
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Kategori</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/katalog?category=programming" className="text-muted-foreground hover:text-primary">
                  Programming
                </Link>
              </li>
              <li>
                <Link href="/katalog?category=business" className="text-muted-foreground hover:text-primary">
                  Bisnis
                </Link>
              </li>
              <li>
                <Link href="/katalog?category=design" className="text-muted-foreground hover:text-primary">
                  Design
                </Link>
              </li>
              <li>
                <Link href="/katalog?category=marketing" className="text-muted-foreground hover:text-primary">
                  Marketing
                </Link>
              </li>
              <li>
                <Link href="/katalog?category=finance" className="text-muted-foreground hover:text-primary">
                  Keuangan
                </Link>
              </li>
              <li>
                <Link href="/katalog?category=self-development" className="text-muted-foreground hover:text-primary">
                  Pengembangan Diri
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold">Hubungi Kami</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">info@sabajayapress.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Jakarta, Indonesia</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Newsletter</h4>
              <p className="text-xs text-muted-foreground">Dapatkan update buku terbaru dan promo menarik</p>
              <div className="flex space-x-2">
                <Input placeholder="Email Anda" className="text-xs" />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">© 2024 SabaJayaPress. All rights reserved.</p>
            <div className="flex space-x-6 text-sm">
              <Link href="/syarat-ketentuan" className="text-muted-foreground hover:text-primary">
                Syarat & Ketentuan
              </Link>
              <Link href="/kebijakan-privasi" className="text-muted-foreground hover:text-primary">
                Kebijakan Privasi
              </Link>
              <Link href="/bantuan" className="text-muted-foreground hover:text-primary">
                Bantuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
