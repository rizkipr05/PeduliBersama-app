"use client";

import { useState } from "react";
import { createDisaster } from "@/services/disasterService";
import { useRouter } from "next/navigation";

export default function CreateDisasterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    needs: "",
    status: "aktif",
  });

  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("location", form.location);
    formData.append("description", form.description);
    formData.append("needs", form.needs);
    formData.append("status", form.status);
    formData.append("image", image);

    await createDisaster(formData);

    alert("Bencana berhasil ditambahkan");
    router.push("/disasters");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-6">
        Tambah Bencana
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Judul Bencana"
          className="border p-3 w-full rounded"
          onChange={(e)=>
            setForm({...form,title:e.target.value})
          }
        />

        <input
          type="text"
          placeholder="Lokasi"
          className="border p-3 w-full rounded"
          onChange={(e)=>
            setForm({...form,location:e.target.value})
          }
        />

        <textarea
          placeholder="Deskripsi"
          className="border p-3 w-full rounded"
          rows={4}
          onChange={(e)=>
            setForm({...form,description:e.target.value})
          }
        />

        <input
          type="text"
          placeholder="Kebutuhan Bantuan"
          className="border p-3 w-full rounded"
          onChange={(e)=>
            setForm({...form,needs:e.target.value})
          }
        />

        <select
          className="border p-3 w-full rounded"
          onChange={(e)=>
            setForm({...form,status:e.target.value})
          }
        >
          <option value="aktif">Aktif</option>
          <option value="selesai">Selesai</option>
        </select>

        <input
          type="file"
          onChange={(e)=>setImage(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-3 rounded"
        >
          Simpan
        </button>

      </form>
    </div>
  );
}