"use client";

import { useEffect, useState } from "react";

import {
  getDonations,
  verifyDonation,
  rejectDonation,
} from "@/services/donationService";

export default function DonationsPage() {

  const [data, setData] = useState([]);

  // FETCH DATA
  const fetchData = async () => {
    try {
      const res = await getDonations();
      setData(res.data);
    } catch (err) {
      alert("Gagal mengambil data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // VERIFY
  const handleVerify = async (id) => {
    try {

      const confirmVerify = confirm(
        "Verifikasi donasi ini?"
      );

      if (!confirmVerify) return;

      await verifyDonation(id);

      alert("Donasi berhasil diverifikasi");

      fetchData();

    } catch (err) {
      alert("Verifikasi gagal");
    }
  };

  // REJECT
  const handleReject = async (id) => {
    try {

      const confirmReject = confirm(
        "Tolak donasi ini?"
      );

      if (!confirmReject) return;

      await rejectDonation(id);

      alert("Donasi ditolak");

      fetchData();

    } catch (err) {
      alert("Gagal menolak donasi");
    }
  };

  return (
    <div>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Verifikasi Donasi
        </h1>

        <p className="text-gray-500">
          Kelola transaksi donasi user
        </p>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">
                Donatur
              </th>

              <th className="p-4 text-left">
                Bencana
              </th>

              <th className="p-4 text-left">
                Nominal
              </th>

              <th className="p-4 text-left">
                Metode
              </th>

              <th className="p-4 text-left">
                Bukti
              </th>

              <th className="p-4 text-left">
                Status
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

                {/* DONATUR */}
                <td className="p-4">
                  {item.user?.name}
                </td>

                {/* BENCANA */}
                <td className="p-4">
                  {item.disaster?.title}
                </td>

                {/* NOMINAL */}
                <td className="p-4">
                  Rp {item.amount?.toLocaleString()}
                </td>

                {/* PAYMENT METHOD */}
                <td className="p-4">
                  {item.payment_method}
                </td>

                {/* PROOF */}
                <td className="p-4">

                  {item.proof ? (
                    <a
                      href={item.proof}
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      Lihat Bukti
                    </a>
                  ) : (
                    "-"
                  )}

                </td>

                {/* STATUS */}
                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "berhasil"
                        ? "bg-green-100 text-green-600"

                        : item.status === "pending"
                        ? "bg-yellow-100 text-yellow-600"

                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                {/* ACTION */}
                <td className="p-4 flex gap-2">

                  {item.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          handleVerify(item.id)
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Verifikasi
                      </button>

                      <button
                        onClick={() =>
                          handleReject(item.id)
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Tolak
                      </button>
                    </>
                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}