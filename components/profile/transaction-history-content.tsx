"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, CreditCard, Receipt, Search, TrendingUp, FileText, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock transaction data with auto-expiry logic
const getTransactionStatus = (date: string, originalStatus: string) => {
  if (originalStatus !== "pending") return originalStatus

  const transactionDate = new Date(date)
  const now = new Date()
  const diffInHours = (now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60)

  // Auto-expire pending transactions after 24 hours
  return diffInHours > 24 ? "failed" : "pending"
}

const transactions = [
  {
    id: "TRX001",
    title: "Panduan Lengkap JavaScript Modern",
    amount: 89000,
    date: "2024-01-15",
    status: "success",
    paymentMethod: "Bank Transfer",
    type: "digital",
    paymentCode: "PAY-001-2024",
    receiptData: {
      transactionId: "TRX001",
      paymentMethod: "Bank Transfer",
      bankName: "BCA",
      accountNumber: "1234567890",
      accountName: "SabaJayaPress",
      paidAt: "2024-01-15 14:30:25",
    },
  },
  {
    id: "TRX002",
    title: "Strategi Bisnis Digital 2024",
    amount: 150000,
    date: "2024-01-10",
    status: "success",
    paymentMethod: "Credit Card",
    type: "physical",
    paymentCode: "PAY-002-2024",
    receiptData: {
      transactionId: "TRX002",
      paymentMethod: "Credit Card",
      cardNumber: "**** **** **** 1234",
      paidAt: "2024-01-10 09:15:42",
    },
  },
  {
    id: "TRX003",
    title: "Desain UI/UX untuk Pemula",
    amount: 75000,
    date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString().split("T")[0], // 12 hours ago
    status: "pending",
    paymentMethod: "Payment Gateway",
    type: "digital",
    paymentCode: "PAY-003-2024",
    receiptData: {
      transactionId: "TRX003",
      paymentMethod: "Payment Gateway",
      paymentCode: "PAY-003-2024",
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString(),
      instructions: "Selesaikan pembayaran sebelum batas waktu berakhir",
    },
  },
  {
    id: "TRX004",
    title: "Investasi Saham untuk Milenial",
    amount: 95000,
    date: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString().split("T")[0], // 30 hours ago (should be failed)
    status: "pending",
    paymentMethod: "WhatsApp Transfer",
    type: "physical",
    paymentCode: "PAY-004-2024",
    receiptData: {
      transactionId: "TRX004",
      paymentMethod: "WhatsApp Transfer",
      status: "Menunggu konfirmasi admin",
      note: "Kirim bukti transfer ke WhatsApp untuk konfirmasi",
    },
  },
]

export default function TransactionHistoryContent() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  // Apply auto-expiry logic to transactions
  const processedTransactions = transactions.map((transaction) => ({
    ...transaction,
    status: getTransactionStatus(transaction.date, transaction.status),
  }))

  const filteredTransactions = processedTransactions.filter((transaction) => {
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesSearch =
      transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const successCount = processedTransactions.filter((t) => t.status === "success").length
  const pendingCount = processedTransactions.filter((t) => t.status === "pending").length
  const failedCount = processedTransactions.filter((t) => t.status === "failed").length
  const totalAmount = processedTransactions.filter((t) => t.status === "success").reduce((sum, t) => sum + t.amount, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Disalin!",
      description: "Kode pembayaran telah disalin ke clipboard",
    })
  }

  const ReceiptDialog = ({ transaction }: { transaction: any }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Receipt className="mr-2 h-4 w-4" />
          Lihat Receipt
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Receipt Pembayaran
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-center mb-4">
              <h3 className="font-bold text-lg">SabaJayaPress</h3>
              <p className="text-sm text-gray-600">Receipt Pembayaran</p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">ID Transaksi:</span>
                <span className="font-medium">{transaction.receiptData.transactionId}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Produk:</span>
                <span className="font-medium text-right max-w-[150px]">{transaction.title}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Metode Pembayaran:</span>
                <span className="font-medium">{transaction.receiptData.paymentMethod}</span>
              </div>

              {transaction.receiptData.bankName && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank:</span>
                    <span className="font-medium">{transaction.receiptData.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">No. Rekening:</span>
                    <span className="font-medium">{transaction.receiptData.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Atas Nama:</span>
                    <span className="font-medium">{transaction.receiptData.accountName}</span>
                  </div>
                </>
              )}

              {transaction.receiptData.cardNumber && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Kartu:</span>
                  <span className="font-medium">{transaction.receiptData.cardNumber}</span>
                </div>
              )}

              {transaction.receiptData.paymentCode && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Kode Pembayaran:</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{transaction.receiptData.paymentCode}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(transaction.receiptData.paymentCode)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}

              {transaction.receiptData.expiresAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Berakhir:</span>
                  <span className="font-medium text-red-600">
                    {new Date(transaction.receiptData.expiresAt).toLocaleString("id-ID")}
                  </span>
                </div>
              )}

              {transaction.receiptData.paidAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Dibayar:</span>
                  <span className="font-medium">
                    {new Date(transaction.receiptData.paidAt).toLocaleString("id-ID")}
                  </span>
                </div>
              )}

              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">Rp {transaction.amount.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <div className="text-center mt-4">
                <Badge className={getStatusColor(transaction.status)}>{getStatusText(transaction.status)}</Badge>
              </div>

              {transaction.receiptData.instructions && (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded mt-4">
                  <p className="text-xs text-yellow-800">{transaction.receiptData.instructions}</p>
                </div>
              )}

              {transaction.receiptData.note && (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded mt-4">
                  <p className="text-xs text-blue-800">{transaction.receiptData.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Transaksi</p>
                <p className="text-2xl font-bold">{processedTransactions.length}</p>
              </div>
              <Receipt className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Berhasil</p>
                <p className="text-2xl font-bold text-green-600">{successCount}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <CreditCard className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Belanja</p>
                <p className="text-2xl font-bold text-blue-600">Rp {totalAmount.toLocaleString("id-ID")}</p>
              </div>
              <CreditCard className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Receipt className="mr-2 h-5 w-5" />
            Riwayat Transaksi
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari transaksi atau ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
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
          </div>

          {/* Transaction List */}
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <Card key={transaction.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {transaction.id}
                        </Badge>
                        <Badge className={getStatusColor(transaction.status)}>
                          {getStatusText(transaction.status)}
                        </Badge>
                        <Badge variant="outline">{transaction.type === "digital" ? "Digital" : "Fisik"}</Badge>
                      </div>

                      <h3 className="font-semibold text-lg mb-2">{transaction.title}</h3>

                      <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(transaction.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="mr-1 h-4 w-4" />
                          {transaction.paymentMethod}
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <p className="text-2xl font-bold text-blue-600">
                        Rp {transaction.amount.toLocaleString("id-ID")}
                      </p>

                      <div className="flex gap-2">
                        <ReceiptDialog transaction={transaction} />
                      </div>

                      {transaction.status === "failed" && (
                        <p className="text-sm text-red-600 mt-1">
                          {transaction.paymentMethod === "WhatsApp Transfer"
                            ? "Tidak ada konfirmasi pembayaran"
                            : "Pembayaran gagal karena batas waktu"}
                        </p>
                      )}
                      {transaction.status === "success" && (
                        <p className="text-sm text-green-600 mt-1">Pembayaran berhasil</p>
                      )}
                      {transaction.status === "pending" && (
                        <p className="text-sm text-yellow-600 mt-1">
                          {transaction.paymentMethod === "WhatsApp Transfer"
                            ? "Menunggu konfirmasi admin"
                            : "Menunggu pembayaran"}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <Receipt className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tidak ada transaksi ditemukan</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? "Coba kata kunci lain" : "Tidak ada transaksi dengan status yang dipilih"}
              </p>
              {!searchQuery && (
                <Button onClick={() => setStatusFilter("all")} variant="outline">
                  Lihat Semua Transaksi
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
