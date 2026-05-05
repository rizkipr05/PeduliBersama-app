import api from "./api";

export const getUsers = () => api.get("/users");
export const deleteUser = (id) => api.delete(`/users/${id}`);