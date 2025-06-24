"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Settings,
  History,
  CreditCard,
  Check,
  AlertTriangle,
  Send,
} from "lucide-react"
import PurchaseHistoryContent from "@/components/profile/purchase-history-content"
import TransactionHistoryContent from "@/components/profile/transaction-history-content"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [activeTab, setActiveTab] = useState("profile")
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(user?.isEmailVerified || true)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")

  // Check for tab parameter in URL
  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["profile", "purchases", "transactions"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  if (!user) {
    router.push("/login")
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Profil berhasil diperbarui! ✅",
        description: "Informasi profil Anda telah disimpan.",
      })
    } catch (error) {
      toast({
        title: "Gagal memperbarui profil",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePhotoUpload = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        toast({
          title: "Foto berhasil diupload! 📸",
          description: "Foto profil Anda telah diperbarui.",
        })
      }
    }
    input.click()
  }

  const sendOTP = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setOtpSent(true)
      toast({
        title: "OTP Terkirim! 📧",
        description: "Kode verifikasi telah dikirim ke email Anda.",
      })
    } catch (error) {
      toast({
        title: "Gagal mengirim OTP",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "OTP tidak valid",
        description: "Masukkan 6 digit kode OTP.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsEmailVerified(true)
      setOtpSent(false)
      setOtp("")
      toast({
        title: "Email berhasil diverifikasi! ✅",
        description: "Akun Anda telah terverifikasi.",
      })
    } catch (error) {
      toast({
        title: "Verifikasi gagal",
        description: "Kode OTP salah. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profil Saya</h1>
            <p className="text-muted-foreground">Kelola informasi profil dan riwayat transaksi Anda</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                Profil
              </TabsTrigger>
              <TabsTrigger value="purchases" className="flex items-center">
                <History className="mr-2 h-4 w-4" />
                History Pembelian
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                History Transaksi
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Pribadi</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center space-x-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Button type="button" variant="outline" onClick={handlePhotoUpload}>
                          <Camera className="mr-2 h-4 w-4" />
                          Ubah Foto
                        </Button>
                        <p className="text-sm text-muted-foreground mt-2">JPG, PNG atau GIF. Maksimal 2MB.</p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Nama Lengkap</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Nama lengkap"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 pr-10"
                            disabled={isEmailVerified || user.authProvider === "google"}
                            required
                          />
                          {isEmailVerified || user.authProvider === "google" ? (
                            <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-600" />
                          )}
                        </div>
                        {!isEmailVerified && user.authProvider === "email" && (
                          <div className="mt-2">
                            <div className="flex items-center space-x-2 text-sm text-red-600 mb-2">
                              <AlertTriangle className="h-4 w-4" />
                              <span>Email belum diverifikasi</span>
                            </div>
                            {!otpSent ? (
                              <Button type="button" variant="outline" size="sm" onClick={sendOTP} disabled={isLoading}>
                                <Send className="mr-2 h-4 w-4" />
                                Kirim OTP
                              </Button>
                            ) : (
                              <div className="flex space-x-2">
                                <Input
                                  placeholder="Masukkan 6 digit OTP"
                                  value={otp}
                                  onChange={(e) => setOtp(e.target.value)}
                                  maxLength={6}
                                  className="w-40"
                                />
                                <Button type="button" size="sm" onClick={verifyOTP} disabled={isLoading}>
                                  Verifikasi
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                        {(isEmailVerified || user.authProvider === "google") && (
                          <div className="flex items-center space-x-2 text-sm text-green-600 mt-2">
                            <Check className="h-4 w-4" />
                            <span>Email terverifikasi</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Nomor Telepon</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="tel"
                            placeholder="Nomor telepon"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Alamat</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Alamat lengkap"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <Button type="button" variant="outline" onClick={() => router.back()}>
                        Batal
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="purchases">
              <PurchaseHistoryContent />
            </TabsContent>

            <TabsContent value="transactions">
              <TransactionHistoryContent />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
