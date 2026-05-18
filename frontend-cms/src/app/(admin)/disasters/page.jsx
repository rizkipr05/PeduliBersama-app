"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getDisasters,
  deleteDisaster,
} from "@/services/disasterService";

export default function DisasterPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getDisasters()
      .then((res) => {
        if (active) {
          setData(Array.isArray(res.data?.data) ? res.data.data : []);
        }
      })
      .catch(() => {
        if (active) {
          alert("Gagal mengambil data bencana");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const fetchData = async () => {
    try {
      const res = await getDisasters();
      setData(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch {
      alert("Gagal mengambil data bencana");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Hapus data?");
    if (!confirmDelete) return;

    try {
      await deleteDisaster(id);
      void fetchData();
    } catch {
      alert("Gagal menghapus data");
    }
  };

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Data Bencana</h1>
          <p className="text-gray-500">Kelola data bencana</p>
        </div>

        <Link
          href="/disasters/create"
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-5 py-2.5 rounded-lg shadow font-medium"
        >
          + Tambah Data
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
        <table className="w-full">
          <thead className="bg-gray-50/75 border-b border-gray-100">
            <tr>
              <th className="p-4 text-left font-semibold text-gray-700">Foto</th>
              <th className="p-4 text-left font-semibold text-gray-700">Judul</th>
              <th className="p-4 text-left font-semibold text-gray-700">Lokasi</th>
              <th className="p-4 text-left font-semibold text-gray-700">Status</th>
              <th className="p-4 text-left font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="p-4">
                  {item.photos && item.photos.length > 0 ? (
                    <img
                      src={item.photos[0].photoUrl}
                      alt={item.title}
                      className="w-24 h-16 object-cover rounded-lg shadow-sm"
                    />
                  ) : (
                    <div className="w-24 h-16 rounded-lg bg-gray-100 text-xs text-gray-400 flex items-center justify-center font-medium border border-gray-200 border-dashed">
                      No Image
                    </div>
                  )}
                </td>

                <td className="p-4 font-medium text-gray-800">{item.title}</td>

                <td className="p-4 text-gray-600">{item.location || "-"}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide ${
                      item.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.status === "ACTIVE" ? "Aktif" : "Selesai"}
                  </span>
                </td>

                <td className="p-4 flex gap-3">
                  <Link
                    href={`/disasters/edit/${item.id}`}
                    className="bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border border-yellow-200 px-4 py-1.5 rounded-lg font-medium transition-colors text-sm"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 px-4 py-1.5 rounded-lg font-medium transition-colors text-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500 font-medium">
                  Belum ada data bencana
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
