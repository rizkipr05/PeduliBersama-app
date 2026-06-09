"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { login } from "@/services/auth";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleLogin = async () => {
    try {
      await login(form);
      router.replace("/dashboard");
    } catch (err) {
      alert("Login gagal");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="p-6 shadow rounded w-80">
        <h1 className="text-xl font-bold mb-4">Login Admin</h1>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          onChange={(e)=>setForm({...form,email:e.target.value})}
        />
        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          onChange={(e)=>setForm({...form,password:e.target.value})}
        />
        <button
          className="bg-blue-500 text-white w-full p-2"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
