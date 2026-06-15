import api from "./api";
import { getCollection, saveCollection, getNextId, toResponse, STORAGE } from "./localData";

export const getDisasters = async () => {
  try {
    return await api.get("/bencana");
  } catch (err) {
    const data = getCollection(STORAGE.disasters);
    return toResponse(data);
  }
};

export const getDisasterById = async (id) => {
  try {
    return await api.get(`/bencana/${id}`);
  } catch (err) {
    const data = getCollection(STORAGE.disasters);
    const item = data.find((d) => d.id === Number(id));
    if (!item) throw new Error("Not found");
    return toResponse(item);
  }
};

export const createDisaster = async (data) => {
  try {
    return await api.post("/bencana", data);
  } catch (err) {
    const list = getCollection(STORAGE.disasters);
    const newItem = { id: getNextId(list), ...data };
    list.push(newItem);
    saveCollection(STORAGE.disasters, list);
    return toResponse(newItem);
  }
};

export const updateDisaster = async (id, data) => {
  try {
    return await api.patch(`/bencana/${id}`, data);
  } catch (err) {
    const list = getCollection(STORAGE.disasters);
    const idx = list.findIndex((d) => d.id === Number(id));
    if (idx === -1) throw new Error("Not found");
    list[idx] = { ...list[idx], ...data };
    saveCollection(STORAGE.disasters, list);
    return toResponse(list[idx]);
  }
};

export const deleteDisaster = async (id) => {
  try {
    return await api.delete(`/bencana/${id}`);
  } catch (err) {
    let list = getCollection(STORAGE.disasters);
    list = list.filter((d) => d.id !== Number(id));
    saveCollection(STORAGE.disasters, list);
    return toResponse(true);
  }
};

export const addPhoto = async (id, data) => {
  try {
    return await api.post(`/bencana/${id}/photos`, data);
  } catch (err) {
    return toResponse(true);
  }
};

export const setNeeds = async (id, data) => {
  try {
    return await api.put(`/bencana/${id}/needs`, data);
  } catch (err) {
    return toResponse(true);
  }
};
