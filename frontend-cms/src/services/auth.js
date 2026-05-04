import api from "./api";

export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  localStorage.setItem("token", res.data.access_token);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};