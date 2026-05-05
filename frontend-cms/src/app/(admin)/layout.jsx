"use client";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full">
        <Navbar />
        <div className="p-6 bg-gray-100 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
}