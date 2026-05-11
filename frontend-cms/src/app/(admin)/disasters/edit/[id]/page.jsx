"use client";

import { useEffect, useState } from "react";
import {
  getDisasterById,
  updateDisaster,
} from "@/services/disasterService";

import { useParams, useRouter } from "next/navigation";

export default function EditDisasterPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    location: "",
    description: "",
    needs: "",
    status: "aktif",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // GET DATA BY ID
  const fetchDetail = async () => {
    try {
      const res = await getDisasterById(id);

      setForm({
        title: res.data.title,
        location: res.data.location,
        description: res.data.description,
        needs: res.data.needs,
        status: res.data.status,
      });

      setPreview(res.data.image);

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

  // UPDATE DATA
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("location", form.location);
      formData.append("description", form.description);
      formData.append("needs", form.needs);
      formData.append("status", form.status);

      // kalau upload gambar baru
      if (image) {
        formData.append("image", image);
      }

      await updateDisaster(id, formData);

      alert("Data berhasil diupdate");

      router.push("/disasters");

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
        Edit Bencana
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* TITLE */}
        <div>
          <label className="block mb-1">
            Judul Bencana
          </label>

          <input
            type="text"
            value={form.title}
            className="border p-3 w-full rounded"
            onChange={(e)=>
              setForm({
                ...form,
                title: e.target.value
              })
            }
          />
        </div>

        {/* LOCATION */}
        <div>
          <label className="block mb-1">
            Lokasi
          </label>

          <input
            type="text"
            value={form.location}
            className="border p-3 w-full rounded"
            onChange={(e)=>
              setForm({
                ...form,
                location: e.target.value
              })
            }
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-1">
            Deskripsi
          </label>

          <textarea
            rows={5}
            value={form.description}
            className="border p-3 w-full rounded"
            onChange={(e)=>
              setForm({
                ...form,
                description: e.target.value
              })
            }
          />
        </div>

        {/* NEEDS */}
        <div>
          <label className="block mb-1">
            Kebutuhan Bantuan
          </label>

          <input
            type="text"
            value={form.needs}
            className="border p-3 w-full rounded"
            onChange={(e)=>
              setForm({
                ...form,
                needs: e.target.value
              })
            }
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="block mb-1">
            Status
          </label>

          <select
            value={form.status}
            className="border p-3 w-full rounded"
            onChange={(e)=>
              setForm({
                ...form,
                status: e.target.value
              })
            }
          >
            <option value="aktif">
              Aktif
            </option>

            <option value="selesai">
              Selesai
            </option>
          </select>
        </div>

        {/* PREVIEW IMAGE */}
        <div>
          <label className="block mb-2">
            Foto Saat Ini
          </label>

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-48 h-32 object-cover rounded mb-3"
            />
          )}
        </div>

        {/* NEW IMAGE */}
        <div>
          <label className="block mb-1">
            Upload Foto Baru
          </label>

          <input
            type="file"
            onChange={(e)=>
              setImage(e.target.files[0])
            }
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-3 rounded"
        >
          Update Data
        </button>

      </form>

    </div>
  );
}