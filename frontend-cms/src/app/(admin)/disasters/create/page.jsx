"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createDisaster } from "@/services/disasterService";

export default function CreateDisasterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [photoUrl, setPhotoUrl] = useState("");

  // Needs State (Dynamic array)
  const [needs, setNeeds] = useState([]);

  const handleAddNeed = () => {
    setNeeds([...needs, { itemName: "", quantity: 1, unit: "", notes: "" }]);
  };

  const updateNeed = (index, field, value) => {
    const newNeeds = [...needs];
    newNeeds[index][field] = value;
    setNeeds(newNeeds);
  };

  const removeNeed = (index) => {
    setNeeds(needs.filter((_, i) => i !== index));
  };

  // Helper to read file to base64 Data URL
  const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Ukuran gambar maksimal 2MB");
        return;
      }
      const dataUrl = await fileToDataUrl(file);
      setPhotoUrl(dataUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title,
        description,
        location,
        status,
        photos: photoUrl ? [{ photoUrl }] : [],
        needs: needs.filter((n) => n.itemName.trim() !== "").map(n => ({
          ...n,
          quantity: n.quantity ? Number(n.quantity) : undefined
        })),
      };

      await createDisaster(payload);
      router.push("/disasters");
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan data bencana");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/disasters" className="text-gray-500 hover:text-gray-900 transition-colors">
          &larr; Kembali
        </Link>
        <h1 className="text-3xl font-bold">Tambah Data Bencana</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Informasi Dasar</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Judul / Nama Bencana *</label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Banjir Bandang Jakarta"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
              <textarea
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail keadaan bencana..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Kabupaten / Kota / Provinsi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="ACTIVE">Aktif (Sedang Berlangsung)</option>
                <option value="COMPLETED">Selesai (Penanganan Berakhir)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow border border-gray-100">
          <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Media / Foto Bencana</h2>
          
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Unggah Gambar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
            />
            {photoUrl && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">Preview:</p>
                <img src={photoUrl} alt="Preview" className="w-64 h-40 object-cover rounded-lg border shadow-sm" />
              </div>
            )}
            <p className="text-xs text-gray-400">Atau masukkan URL Gambar langsung di bawah ini (opsional)</p>
            <input
              type="url"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg text-sm"
              value={photoUrl.startsWith("data:") ? "" : photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow border border-gray-100">
          <div className="flex justify-between items-center mb-6 pb-2 border-b">
            <h2 className="text-xl font-semibold">Kebutuhan Bantuan (Relief Needs)</h2>
            <button
              type="button"
              onClick={handleAddNeed}
              className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
            >
              + Tambah Item
            </button>
          </div>

          {needs.length === 0 ? (
            <div className="text-center py-6 text-gray-400">
              Belum ada data kebutuhan bantuan ditambahkan.
            </div>
          ) : (
            <div className="space-y-4">
              {needs.map((need, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Nama Barang *</label>
                      <input
                        type="text"
                        required
                        placeholder="Cth: Sembako, Pakaian"
                        className="w-full border border-gray-300 px-3 py-1.5 rounded text-sm"
                        value={need.itemName}
                        onChange={(e) => updateNeed(idx, "itemName", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Jumlah</label>
                      <input
                        type="number"
                        min="1"
                        className="w-full border border-gray-300 px-3 py-1.5 rounded text-sm"
                        value={need.quantity}
                        onChange={(e) => updateNeed(idx, "quantity", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Satuan</label>
                      <input
                        type="text"
                        placeholder="Cth: Dus, Kg, Pcs"
                        className="w-full border border-gray-300 px-3 py-1.5 rounded text-sm"
                        value={need.unit}
                        onChange={(e) => updateNeed(idx, "unit", e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeNeed(idx)}
                    className="text-red-500 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg text-sm mt-5"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 pb-12">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all disabled:opacity-70 flex gap-2 items-center text-lg"
          >
            {loading ? "Menyimpan data..." : "Simpan Data Bencana"}
          </button>
        </div>
      </form>
    </div>
  );
}