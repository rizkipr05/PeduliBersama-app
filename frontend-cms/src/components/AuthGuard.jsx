"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    if (!token) {
      router.replace("/login");
      return;
    }

    if (user?.role !== "admin") {
      alert("Akses ditolak");
      router.replace("/login");
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return children;
}
