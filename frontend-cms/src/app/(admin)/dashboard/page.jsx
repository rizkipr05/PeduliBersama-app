"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const donationData = [
  { month: "Jan", total: 4000000 },
  { month: "Feb", total: 7000000 },
  { month: "Mar", total: 5000000 },
  { month: "Apr", total: 9000000 },
  { month: "Mei", total: 12000000 },
];

const disasterData = [
  { name: "Aktif", value: 8 },
  { name: "Selesai", value: 5 },
];

const COLORS = ["#ef4444", "#22c55e"];

export default function DashboardPage() {
  return (
    <div>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">
          Monitoring sistem PeduliBersama
        </p>
      </div>

      {/* CARD STATISTIK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total User</h2>
          <p className="text-3xl font-bold mt-2">1,245</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Donasi</h2>
          <p className="text-3xl font-bold mt-2">
            Rp 120 Juta
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Bencana Aktif</h2>
          <p className="text-3xl font-bold mt-2">8</p>
        </div>

      </div>

      {/* GRAFIK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Donasi per Bulan
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={donationData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />

              <Bar dataKey="total" fill="#3b82f6" radius={[5,5,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Status Bencana
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={disasterData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {disasterData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* RECENT DONATION */}
      <div className="bg-white p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Donasi Terbaru
        </h2>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-2">Nama</th>
              <th className="pb-2">Bencana</th>
              <th className="pb-2">Nominal</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-3">Dani</td>
              <td>Banjir Bandung</td>
              <td>Rp 500.000</td>
              <td>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                  Berhasil
                </span>
              </td>
            </tr>

            <tr className="border-b">
              <td className="py-3">Budi</td>
              <td>Gempa Cianjur</td>
              <td>Rp 250.000</td>
              <td>
                <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>

        </table>
      </div>

    </div>
  );
}