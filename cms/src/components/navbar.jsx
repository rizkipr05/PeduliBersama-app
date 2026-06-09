"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/services/auth";

export default function Navbar() {

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="h-16 bg-white shadow flex justify-between items-center px-6">

      <h1 className="font-semibold">
        Admin Panel
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

    </div>
  );
}
