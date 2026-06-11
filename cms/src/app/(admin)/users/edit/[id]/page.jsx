"use client";

import { useEffect, useState } from "react";
import { getUserById, updateUser } from "@/services/userService";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FiUser, FiMail, FiShield, FiArrowLeft, FiSave } from "react-icons/fi";

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", role: "donatur" });

  useEffect(() => {
    if (!id) return;
    getUserById(id)
      .then((res) => {
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          role: res.data.role || "donatur",
        });
      })
      .catch(() => setError("Gagal memuat data user"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await updateUser(id, form);
      router.push("/users");
    } catch {
      setError("Gagal memperbarui user. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      {/* Back */}
      <Link
        href="/users"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors"
      >
        <FiArrowLeft className="h-4 w-4" />
        Kembali ke daftar user
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h1 className="text-xl font-bold text-gray-800">Edit User</h1>
          <p className="text-sm text-gray-500 mt-0.5">Perbarui informasi akun pengguna</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
              {error}
            </div>
          )}

          {/* Nama */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Nama Lengkap
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                required
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Nama lengkap"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="email"
                required
                value={form.email}
                onChange={handleChange("email")}
                placeholder="email@example.com"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400"
              />
            </div>
          </div>

          {/* Role */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Role
            </label>
            <div className="relative">
              <FiShield className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={form.role}
                onChange={handleChange("role")}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 bg-white appearance-none"
              >
                <option value="donatur">Donatur</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
            >
              {saving ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <FiSave className="h-4 w-4" />
              )}
              {saving ? "Menyimpan..." : "Update User"}
            </button>
            <Link
              href="/users"
              className="inline-flex items-center px-5 py-2.5 rounded-lg font-medium text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}