"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/AuthGuard";

export default function AdminLayout({ children }) {
  return (
    <AuthGuard>

      <div className="flex">

        <Sidebar />

        <div className="ml-64 w-full">

          <Navbar />

          <div className="p-6 bg-gray-100 min-h-screen">
            {children}
          </div>

        </div>

      </div>

    </AuthGuard>
  );
}