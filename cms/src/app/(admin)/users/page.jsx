"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiUsers } from "react-icons/fi";
import { getUsers, deleteUser } from "@/services/userService";

export default function UsersPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setData(Array.isArray(res.data) ? res.data : []);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Hapus user ini?")) return;
    setDeletingId(id);
    try {
      await deleteUser(id);
      await fetchData();
    } catch {
      alert("Gagal menghapus user");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = data.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiUsers className="text-violet-500" />
            Manajemen User
          </h1>
          <p className="text-gray-500 text-sm mt-1">Kelola akun pengguna sistem</p>
        </div>
        <Link
          href="/users/create"
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          <FiPlus className="h-4 w-4" />
          Tambah User
        </Link>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Cari nama atau email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 bg-white"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-gray-400">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent mb-3" />
            <p className="text-sm">Memuat data...</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-left font-semibold text-gray-600">#</th>
                <th className="p-4 text-left font-semibold text-gray-600">Nama</th>
                <th className="p-4 text-left font-semibold text-gray-600">Email</th>
                <th className="p-4 text-left font-semibold text-gray-600">Role</th>
                <th className="p-4 text-left font-semibold text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-400">{idx + 1}</td>
                  <td className="p-4 font-medium text-gray-800">{item.name}</td>
                  <td className="p-4 text-gray-500">{item.email}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.role === "admin"
                          ? "bg-violet-100 text-violet-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/users/edit/${item.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
                      >
                        <FiEdit2 className="h-3 w-3" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={deletingId === item.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        <FiTrash2 className="h-3 w-3" />
                        {deletingId === item.id ? "..." : "Hapus"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-16 text-center text-gray-400">
                    <FiUsers className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    <p>Tidak ada data user ditemukan</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* FOOTER COUNT */}
      {!loading && (
        <p className="text-sm text-gray-500">
          Menampilkan <span className="font-medium text-gray-700">{filtered.length}</span> dari{" "}
          <span className="font-medium text-gray-700">{data.length}</span> user
        </p>
      )}
    </div>
  );
}
