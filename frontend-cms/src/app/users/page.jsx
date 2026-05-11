"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  getUsers,
  deleteUser,
} from "@/services/userService";

export default function UsersPage() {

  const [data, setData] = useState([]);

  // FETCH DATA
  const fetchData = async () => {
    try {
      const res = await getUsers();
      setData(res.data);
    } catch (err) {
      alert("Gagal mengambil data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // DELETE
  const handleDelete = async (id) => {

    const confirmDelete = confirm(
      "Hapus user ini?"
    );

    if (!confirmDelete) return;

    try {

      await deleteUser(id);

      alert("User berhasil dihapus");

      fetchData();

    } catch (err) {
      alert("Gagal menghapus user");
    }
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Manajemen User
          </h1>

          <p className="text-gray-500">
            Kelola akun pengguna
          </p>
        </div>

        <Link
          href="/users/create"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Tambah User
        </Link>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">
                Nama
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Aksi
              </th>
            </tr>

          </thead>

          <tbody>

            {data.map((item) => (

              <tr
                key={item.id}
                className="border-t"
              >

                {/* NAME */}
                <td className="p-4">
                  {item.name}
                </td>

                {/* EMAIL */}
                <td className="p-4">
                  {item.email}
                </td>

                {/* ROLE */}
                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.role === "admin"
                        ? "bg-purple-100 text-purple-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {item.role}
                  </span>

                </td>

                {/* ACTION */}
                <td className="p-4 flex gap-2">

                  <Link
                    href={`/users/edit/${item.id}`}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}