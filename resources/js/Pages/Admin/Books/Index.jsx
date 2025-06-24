"use client"

import { useState } from "react"
import { Link, router } from "@inertiajs/react"
import AdminLayout from "@/Layouts/AdminLayout"

export default function BooksIndex({ books, categories, filters }) {
  const [search, setSearch] = useState(filters.search || "")
  const [category, setCategory] = useState(filters.category || "")
  const [status, setStatus] = useState(filters.status || "")

  const handleSearch = (e) => {
    e.preventDefault()
    router.get("/admin/books", { search, category, status }, { preserveState: true })
  }

  const handleDelete = (book) => {
    if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      router.delete(`/admin/books/${book.id}`)
    }
  }

  const toggleStatus = (book) => {
    router.put(`/admin/books/${book.id}`, {
      ...book,
      is_active: !book.is_active,
    })
  }

  const toggleFeatured = (book) => {
    router.put(`/admin/books/${book.id}`, {
      ...book,
      is_featured: !book.is_featured,
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Buku</h1>
            <p className="text-gray-600">Kelola koleksi buku</p>
          </div>
          <Link
            href="/admin/books/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium inline-flex items-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Buku
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari buku atau penulis..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua Kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua Status</option>
                <option value="1">Aktif</option>
                <option value="0">Tidak Aktif</option>
              </select>
            </div>
            <button type="submit" className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium">
              Filter
            </button>
          </form>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.data.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative">
                <img src={book.image_url || "/placeholder.svg"} alt={book.title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                      book.is_digital ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {book.is_digital ? "Digital" : "Fisik"}
                  </span>
                  {book.is_featured && (
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => toggleStatus(book)}
                    className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                      book.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {book.is_active ? "Aktif" : "Nonaktif"}
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                    {book.category.name}
                  </span>
                </div>
                <h3 className="font-semibold text-sm mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-xs text-gray-600 mb-2">oleh {book.author}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <svg className="h-4 w-4 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-medium">{book.rating}</span>
                    <span className="text-xs text-gray-500">({book.reviews_count})</span>
                  </div>
                  <div className="text-xs text-gray-500">{book.sales_count} terjual</div>
                </div>

                <div className="mb-3">
                  <div className="text-sm font-bold text-blue-600">Rp {book.price.toLocaleString("id-ID")}</div>
                  {book.original_price && (
                    <div className="text-xs text-gray-500 line-through">
                      Rp {book.original_price.toLocaleString("id-ID")}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    <Link href={`/admin/books/${book.id}`} className="text-blue-600 hover:text-blue-800 text-xs">
                      Lihat
                    </Link>
                    <Link
                      href={`/admin/books/${book.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-800 text-xs"
                    >
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(book)} className="text-red-600 hover:text-red-800 text-xs">
                      Hapus
                    </button>
                  </div>
                  <button
                    onClick={() => toggleFeatured(book)}
                    className="text-yellow-600 hover:text-yellow-800 text-xs"
                  >
                    {book.is_featured ? "Unfeature" : "Feature"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {books.links && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                {books.prev_page_url && (
                  <Link
                    href={books.prev_page_url}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </Link>
                )}
                {books.next_page_url && (
                  <Link
                    href={books.next_page_url}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Next
                  </Link>
                )}
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{books.from}</span> to{" "}
                    <span className="font-medium">{books.to}</span> of{" "}
                    <span className="font-medium">{books.total}</span> results
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
