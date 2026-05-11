import api from "./api";
import {
  fileToDataUrl,
  getCollection,
  getNextId,
  saveCollection,
  STORAGE,
  toResponse,
} from "./localData";

const mapFormDataToDisaster = async (data, current = {}) => {
  const imageFile = data.get("image");
  const nextImage =
    imageFile && typeof imageFile.name === "string" && imageFile.size > 0
      ? await fileToDataUrl(imageFile)
      : current.image || "";

  return {
    title: data.get("title") || "",
    location: data.get("location") || "",
    description: data.get("description") || "",
    needs: data.get("needs") || "",
    status: data.get("status") || "aktif",
    image: nextImage,
  };
};

export const getDisasters = async () => {
  try {
    return await api.get("/bencana");
  } catch {
    return toResponse(getCollection(STORAGE.disasters));
  }
};

export const getDisasterById = async (id) => {
  try {
    return await api.get(`/bencana/${id}`);
  } catch {
    const disasters = getCollection(STORAGE.disasters);
    const disaster = disasters.find((item) => String(item.id) === String(id));

    if (!disaster) {
      throw new Error("Bencana tidak ditemukan");
    }

    return toResponse(disaster);
  }
};

export const createDisaster = async (data) => {
  try {
    return await api.post("/bencana", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch {
    const disasters = getCollection(STORAGE.disasters);
    const payload = await mapFormDataToDisaster(data);
    const newDisaster = {
      id: getNextId(disasters),
      ...payload,
    };

    saveCollection(STORAGE.disasters, [...disasters, newDisaster]);
    return toResponse(newDisaster);
  }
};

export const updateDisaster = async (id, data) => {
  try {
    return await api.patch(`/bencana/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch {
    const disasters = getCollection(STORAGE.disasters);
    const current = disasters.find((item) => String(item.id) === String(id));

    if (!current) {
      throw new Error("Bencana tidak ditemukan");
    }

    const payload = await mapFormDataToDisaster(data, current);
    const nextDisasters = disasters.map((item) =>
      String(item.id) === String(id) ? { ...item, ...payload, id: item.id } : item
    );
    const updatedDisaster = nextDisasters.find(
      (item) => String(item.id) === String(id)
    );

    saveCollection(STORAGE.disasters, nextDisasters);
    return toResponse(updatedDisaster);
  }
};

export const deleteDisaster = async (id) => {
  try {
    return await api.delete(`/bencana/${id}`);
  } catch {
    const disasters = getCollection(STORAGE.disasters);
    saveCollection(
      STORAGE.disasters,
      disasters.filter((item) => String(item.id) !== String(id))
    );
    return toResponse({ success: true });
  }
};
