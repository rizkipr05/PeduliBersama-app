"use client";

import { useEffect, useState } from "react";

import { getDonationReports }
from "@/services/reportService";

import jsPDF from "jspdf";

import autoTable
from "jspdf-autotable";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

export default function ReportsPage() {

  const [data, setData] = useState([]);

  // FETCH REPORT DATA
  const fetchData = async () => {
    try {

      const res =
        await getDonationReports();

      setData(res.data);

    } catch (err) {
      alert("Gagal mengambil laporan");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // EXPORT PDF
  const exportPDF = () => {

    const doc = new jsPDF();

    doc.text(
      "Laporan Donasi PeduliBersama",
      14,
      15
    );

    const tableColumn = [
      "Donatur",
      "Bencana",
      "Nominal",
      "Status",
    ];

    const tableRows = [];

    data.forEach((item) => {

      tableRows.push([
        item.user?.name,
        item.disaster?.title,
        `Rp ${item.amount.toLocaleString()}`,
        item.status,
      ]);

    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
    });

    doc.save("laporan-donasi.pdf");
  };

  // EXPORT EXCEL
  const exportExcel = () => {

    const exportData = data.map(
      (item) => ({
        Donatur: item.user?.name,
        Bencana: item.disaster?.title,
        Nominal: item.amount,
        Status: item.status,
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(exportData);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Laporan Donasi"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    const fileData =
      new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });

    saveAs(
      fileData,
      "laporan-donasi.xlsx"
    );
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Laporan Donasi
          </h1>

          <p className="text-gray-500">
            Export laporan PDF & Excel
          </p>

        </div>

        {/* BUTTON */}
        <div className="flex gap-3">

          <button
            onClick={exportPDF}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Export PDF
          </button>

          <button
            onClick={exportExcel}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Export Excel
          </button>

        </div>

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
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {data.map((item) => (

              <tr
                key={item.id}
                className="border-t"
              >

                <td className="p-4">
                  {item.user?.name}
                </td>

                <td className="p-4">
                  {item.disaster?.title}
                </td>

                <td className="p-4">
                  Rp {item.amount.toLocaleString()}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "berhasil"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}