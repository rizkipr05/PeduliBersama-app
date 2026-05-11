"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {

  const router = useRouter();

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {

    // AMBIL TOKEN
    const token =
      localStorage.getItem("token");

    // AMBIL USER
    const userData =
      localStorage.getItem("user");

    // PARSE USER
    const user =
      userData ? JSON.parse(userData) : null;

    // BELUM LOGIN
    if (!token) {

      router.push("/login");

      return;
    }

    // BUKAN ADMIN
    if (user?.role !== "admin") {

      alert("Akses ditolak");

      router.push("/login");

      return;
    }

    // BOLEH AKSES
    setAuthorized(true);

  }, []);

  // LOADING
  if (!authorized) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return children;
}