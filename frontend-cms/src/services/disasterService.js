import api from "./api";

export const getDisasters = async () => {
  return await api.get("/disasters");
};

export const getDisasterById = async (id) => {
  return await api.get(`/disasters/${id}`);
};

export const createDisaster = async (data) => {
  return await api.post("/disasters", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateDisaster = async (id, data) => {
  return await api.patch(`/disasters/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteDisaster = async (id) => {
  return await api.delete(`/disasters/${id}`);
};