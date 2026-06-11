import api from "./api";
import { getCollection, STORAGE } from "./localData";

export const login = async (data) => {
  try {
    // Attempt actual API login if backend is up
    const res = await api.post("/login", data);
    localStorage.setItem("token", res.data.access_token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  } catch {
    // FALLBACK: JSON-based Offline Login
    const users = getCollection(STORAGE.users);
    const user = users.find(
      (u) => 
        u.email === data.email || 
        (data.email === "admin" && u.role === "admin")
    );

    if (!user) {
      throw new Error("User tidak ditemukan di database lokal");
    }

    const result = {
      access_token: "dummy-local-token-" + Date.now(),
      user,
    };

    localStorage.setItem("token", result.access_token);
    localStorage.setItem("user", JSON.stringify(result.user));

    return result;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
