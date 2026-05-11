import api from "./api";
import {
  getCollection,
  getNextId,
  saveCollection,
  STORAGE,
  toResponse,
} from "./localData";

// GET ALL USERS
export const getUsers = async () => {
  try {
    return await api.get("/users");
  } catch {
    return toResponse(getCollection(STORAGE.users));
  }
};

// GET USER DETAIL
export const getUserById = async (id) => {
  try {
    return await api.get(`/users/${id}`);
  } catch {
    const users = getCollection(STORAGE.users);
    const user = users.find((item) => String(item.id) === String(id));

    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    return toResponse(user);
  }
};

// CREATE USER
export const createUser = async (data) => {
  try {
    return await api.post("/users", data);
  } catch {
    const users = getCollection(STORAGE.users);
    const newUser = {
      id: getNextId(users),
      name: data.name,
      email: data.email,
      role: data.role,
    };

    saveCollection(STORAGE.users, [...users, newUser]);
    return toResponse(newUser);
  }
};

// UPDATE USER
export const updateUser = async (id, data) => {
  try {
    return await api.patch(`/users/${id}`, data);
  } catch {
    const users = getCollection(STORAGE.users);
    const nextUsers = users.map((item) =>
      String(item.id) === String(id) ? { ...item, ...data, id: item.id } : item
    );
    const updatedUser = nextUsers.find((item) => String(item.id) === String(id));

    if (!updatedUser) {
      throw new Error("User tidak ditemukan");
    }

    saveCollection(STORAGE.users, nextUsers);
    return toResponse(updatedUser);
  }
};

// DELETE USER
export const deleteUser = async (id) => {
  try {
    return await api.delete(`/users/${id}`);
  } catch {
    const users = getCollection(STORAGE.users);
    saveCollection(
      STORAGE.users,
      users.filter((item) => String(item.id) !== String(id))
    );
    return toResponse({ success: true });
  }
};
