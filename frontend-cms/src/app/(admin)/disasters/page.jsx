"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getDisasters,
  deleteDisaster,
} from "@/services/disasterService";

export default function DisasterPage() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getDisasters();
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Hapus data?");
    if (!confirmDelete) return;

    await deleteDisaster(id);
    fetchData();
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Data Bencana
          </h1>
          <p className="text-gray-500">
            Kelola data bencana
          </p>
        </div>

        <Link
          href="/disasters/create"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Tambah
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Foto</th>
              <th className="p-4 text-left">Judul</th>
              <th className="p-4 text-left">Lokasi</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t">

                <td className="p-4">
                  <img
                    src={item.image}
                    alt=""
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>

                <td className="p-4">
                  {item.title}
                </td>

                <td className="p-4">
                  {item.location}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "aktif"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-4 flex gap-2">

                  <Link
                    href={`/disasters/edit/${item.id}`}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(item.id)}
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