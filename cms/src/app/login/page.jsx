"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

import { login } from "@/services/auth";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setErrorMessage("Email dan password harus diisi");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      console.log("Attempting login with:", form);
      await login(form);
      router.replace("/dashboard");
    } catch (error) {
      console.error("Login component error:", error);
      setErrorMessage(error.message || "Email atau password salah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 font-sans">
      {/* Decorative background glows */}
      <div className="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      
      <div className="relative w-full max-w-md p-4">
        {/* Logo/Brand Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/20 mb-3">
            <span className="text-xl font-bold font-mono">PB</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Peduli<span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Bersama</span>
          </h2>
          <p className="mt-2 text-sm text-slate-400">Portal CMS Administrator</p>
        </div>

        {/* Login Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-8 shadow-2xl shadow-black/40">
          <h3 className="text-xl font-semibold text-white mb-6">Login Ke Akun</h3>

          {errorMessage && (
            <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 animate-in fade-in slide-in-from-top-1 duration-200">
              <FiAlertCircle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                  <FiMail className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="admin@pedulibersama.id"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 bg-slate-950/50 text-white placeholder-slate-600 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Password</label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                  <FiLock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-800 bg-slate-950/50 text-white placeholder-slate-600 outline-none transition-all duration-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-95 hover:shadow-lg hover:shadow-indigo-600/25 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none mt-2"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  <span>Sedang masuk...</span>
                </div>
              ) : (
                "Masuk Ke Dashboard"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
