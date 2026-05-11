import api from "./api";

// GET ALL USERS
export const getUsers = async () => {
  return await api.get("/users");
};

// GET USER DETAIL
export const getUserById = async (id) => {
  return await api.get(`/users/${id}`);
};

// CREATE USER
export const createUser = async (data) => {
  return await api.post("/users", data);
};

// UPDATE USER
export const updateUser = async (id, data) => {
  return await api.patch(`/users/${id}`, data);
};

// DELETE USER
export const deleteUser = async (id) => {
  return await api.delete(`/users/${id}`);
};