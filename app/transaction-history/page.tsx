"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { Calendar, CreditCard, Receipt, Filter } from "lucide-react"

// Mock transaction data
const transactions = [
  {
    id: "TRX001",
    title: "Panduan Lengkap JavaScript Modern",
    amount: 89000,
    date: "2024-01-15",
    status: "success",
    paymentMethod: "Bank Transfer",
    type: "digital",
  },
  {
    id: "TRX002",
    title: "Strategi Bisnis Digital 2024",
    amount: 150000,
    date: "2024-01-10",
    status: "success",
    paymentMethod: "Credit Card",
    type: "physical",
  },
  {
    id: "TRX003",
    title: "Desain UI/UX untuk Pemula",
    amount: 75000,
    date: "2024-01-05",
    status: "pending",
    paymentMethod: "Bank Transfer",
    type: "digital",
  },
  {
    id: "TRX004",
    title: "Investasi Saham untuk Milenial",
    amount: 95000,
    date: "2024-01-01",
    status: "failed",
    paymentMethod: "Credit Card",
    type: "physical",
  },
]

export default function TransactionHistoryPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState("all")

  if (!user) {
    router.push("/login")
    return null
  }

  const filteredTransactions = transactions.filter((transaction) => {
    if (statusFilter === "all") return true
    return transaction.status === statusFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "success":
        return "Berhasil"
      case "pending":
        return "Pending"
      case "failed":
        return "Gagal"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">History Transaksi</h1>
            <p className="text-muted-foreground">Lihat semua transaksi dan status pembayaran Anda</p>
          </div>

          {/* Filter */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Filter className="mr-2 h-5 w-5" />
                Filter Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                >
                  Semua
                </Button>
                <Button
                  variant={statusFilter === "success" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("success")}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Berhasil
                </Button>
                <Button
                  variant={statusFilter === "pending" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("pending")}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  Pending
                </Button>
                <Button
                  variant={statusFilter === "failed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("failed")}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Gagal
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Transaction List */}
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Receipt className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono text-sm text-muted-foreground">{transaction.id}</span>
                        <Badge className={getStatusColor(transaction.status)}>
                          {getStatusText(transaction.status)}
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-lg mb-1">{transaction.title}</h3>

                      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(transaction.date).toLocaleDateString("id-ID")}
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="mr-1 h-4 w-4" />
                          {transaction.paymentMethod}
                        </div>
                        <Badge variant="outline">{transaction.type === "digital" ? "Digital" : "Fisik"}</Badge>
                      </div>
                    </div>

                    <div className="text-right mt-4 md:mt-0">
                      <p className="font-bold text-xl">Rp {transaction.amount.toLocaleString("id-ID")}</p>
                      {transaction.status === "failed" && (
                        <p className="text-sm text-red-600 mt-1">Pembayaran gagal karena batas waktu</p>
                      )}
                      {transaction.status === "pending" && (
                        <p className="text-sm text-yellow-600 mt-1">Menunggu konfirmasi pembayaran</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Receipt className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Tidak ada transaksi</h3>
                <p className="text-muted-foreground mb-4">Tidak ada transaksi dengan status yang dipilih.</p>
                <Button onClick={() => setStatusFilter("all")} variant="outline">
                  Lihat Semua Transaksi
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
