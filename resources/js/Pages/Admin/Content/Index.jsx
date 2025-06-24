"use client"

import { useForm } from "@inertiajs/react"
import AdminLayout from "@/Layouts/AdminLayout"

export default function ContentIndex({ contents }) {
  const { data, setData, put, processing, errors } = useForm({
    hero_title: contents.hero_title?.value || "Temukan Buku Digital & Fisik Berkualitas Tinggi",
    hero_subtitle:
      contents.hero_subtitle?.value ||
      "SabaJayaPress adalah platform terpercaya untuk membeli buku digital dan fisik dengan koleksi lengkap dan kualitas terbaik.",
    about_title: contents.about_title?.value || "Membangun Masa Depan Literasi Digital",
    about_description:
      contents.about_description?.value ||
      "SabaJayaPress didirikan dengan misi mulia untuk menyebarkan ilmu pengetahuan melalui buku-buku berkualitas tinggi yang mudah diakses oleh semua orang di era digital.",
    contact_email: contents.contact_email?.value || "info@sabajayapress.com",
    contact_phone: contents.contact_phone?.value || "+62 812-3456-7890",
    contact_address: contents.contact_address?.value || "Jl. Sudirman No. 123, Jakarta Pusat",
    whatsapp_number: contents.whatsapp_number?.value || "6281234567890",
    social_facebook: contents.social_facebook?.value || "",
    social_twitter: contents.social_twitter?.value || "",
    social_instagram: contents.social_instagram?.value || "",
    social_youtube: contents.social_youtube?.value || "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    put("/admin/content")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Konten Website</h1>
          <p className="text-gray-600">Ubah konten yang ditampilkan di website</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hero Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Hero</label>
                <input
                  type="text"
                  value={data.hero_title}
                  onChange={(e) => setData("hero_title", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.hero_title && <p className="mt-1 text-sm text-red-600">{errors.hero_title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle Hero</label>
                <textarea
                  value={data.hero_subtitle}
                  onChange={(e) => setData("hero_subtitle", e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.hero_subtitle && <p className="mt-1 text-sm text-red-600">{errors.hero_subtitle}</p>}
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tentang Kami</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Tentang Kami</label>
                <input
                  type="text"
                  value={data.about_title}
                  onChange={(e) => setData("about_title", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.about_title && <p className="mt-1 text-sm text-red-600">{errors.about_title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Tentang Kami</label>
                <textarea
                  value={data.about_description}
                  onChange={(e) => setData("about_description", e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.about_description && <p className="mt-1 text-sm text-red-600">{errors.about_description}</p>}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Kontak</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={data.contact_email}
                  onChange={(e) => setData("contact_email", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.contact_email && <p className="mt-1 text-sm text-red-600">{errors.contact_email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telepon</label>
                <input
                  type="text"
                  value={data.contact_phone}
                  onChange={(e) => setData("contact_phone", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.contact_phone && <p className="mt-1 text-sm text-red-600">{errors.contact_phone}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat</label>
                <textarea
                  value={data.contact_address}
                  onChange={(e) => setData("contact_address", e.target.value)}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {errors.contact_address && <p className="mt-1 text-sm text-red-600">{errors.contact_address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp (dengan kode negara)</label>
                <input
                  type="text"
                  value={data.whatsapp_number}
                  onChange={(e) => setData("whatsapp_number", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="6281234567890"
                  required
                />
                {errors.whatsapp_number && <p className="mt-1 text-sm text-red-600">{errors.whatsapp_number}</p>}
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Sosial</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                <input
                  type="url"
                  value={data.social_facebook}
                  onChange={(e) => setData("social_facebook", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://facebook.com/sabajayapress"
                />
                {errors.social_facebook && <p className="mt-1 text-sm text-red-600">{errors.social_facebook}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                <input
                  type="url"
                  value={data.social_twitter}
                  onChange={(e) => setData("social_twitter", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://twitter.com/sabajayapress"
                />
                {errors.social_twitter && <p className="mt-1 text-sm text-red-600">{errors.social_twitter}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                <input
                  type="url"
                  value={data.social_instagram}
                  onChange={(e) => setData("social_instagram", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://instagram.com/sabajayapress"
                />
                {errors.social_instagram && <p className="mt-1 text-sm text-red-600">{errors.social_instagram}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                <input
                  type="url"
                  value={data.social_youtube}
                  onChange={(e) => setData("social_youtube", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://youtube.com/sabajayapress"
                />
                {errors.social_youtube && <p className="mt-1 text-sm text-red-600">{errors.social_youtube}</p>}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50"
            >
              {processing ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
