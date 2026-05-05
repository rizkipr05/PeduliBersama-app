import api from "./api";

export const getDisasters = () => api.get("/disasters");
export const createDisaster = (data) => api.post("/disasters", data);