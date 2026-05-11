"use client";

import { useState } from "react";
import { createUser } from "@/services/userService";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {

  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "donatur",
  });

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await createUser(form);

      alert("User berhasil ditambahkan");

      router.push("/users");

    } catch (err) {
      alert("Gagal menambahkan user");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-6">
        Tambah User
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* NAME */}
        <input
          type="text"
          placeholder="Nama"
          className="border p-3 w-full rounded"
          onChange={(e)=>
            setForm({
              ...form,
              name: e.target.value
            })
          }
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full rounded"
          onChange={(e)=>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full rounded"
          onChange={(e)=>
            setForm({
              ...form,
              password: e.target.value
            })
          }
        />

        {/* ROLE */}
        <select
          className="border p-3 w-full rounded"
          onChange={(e)=>
            setForm({
              ...form,
              role: e.target.value
            })
          }
        >
          <option value="donatur">
            Donatur
          </option>

          <option value="admin">
            Admin
          </option>
        </select>

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-3 rounded"
        >
          Simpan User
        </button>

      </form>

    </div>
  );
}