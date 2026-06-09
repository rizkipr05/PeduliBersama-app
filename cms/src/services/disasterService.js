import api from "./api";

export const getDisasters = async () => {
  return await api.get("/bencana");
};

export const getDisasterById = async (id) => {
  return await api.get(`/bencana/${id}`);
};

export const createDisaster = async (data) => {
  return await api.post("/bencana", data);
};

export const updateDisaster = async (id, data) => {
  return await api.patch(`/bencana/${id}`, data);
};

export const deleteDisaster = async (id) => {
  return await api.delete(`/bencana/${id}`);
};

export const addPhoto = async (id, data) => {
  return await api.post(`/bencana/${id}/photos`, data);
};

export const setNeeds = async (id, data) => {
  return await api.put(`/bencana/${id}/needs`, data);
};
