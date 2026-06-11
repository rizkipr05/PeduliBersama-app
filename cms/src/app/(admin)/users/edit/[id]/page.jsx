"use client";

import { useEffect, useState } from "react";

import {
  getUserById,
  updateUser,
} from "@/services/userService";

import {
  useParams,
  useRouter,
} from "next/navigation";

export default function EditUserPage() {

  const { id } = useParams();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "donatur",
  });

  // FETCH DETAIL
  const fetchDetail = async () => {
    try {

      const res = await getUserById(id);

      setForm({
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
      });

      setLoading(false);

    } catch (err) {
      alert("Gagal mengambil data");
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  // UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await updateUser(id, form);

      alert("User berhasil diupdate");

      router.push("/users");

    } catch (err) {
      alert("Update gagal");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-6">
        Edit User
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* NAME */}
        <input
          type="text"
          value={form.name}
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
          value={form.email}
          className="border p-3 w-full rounded"
          onChange={(e)=>
            setForm({
              ...form,
              email: e.target.value
            })
          }
        />

        {/* ROLE */}
        <select
          value={form.role}
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
          Update User
        </button>

      </form>

    </div>
  );
}