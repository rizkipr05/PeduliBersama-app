const STORAGE_KEYS = {
  users: "cms_users",
  disasters: "cms_disasters",
  donations: "cms_donations",
};

const defaultUsers = [
  {
    id: 1,
    name: "Admin Peduli",
    email: "admin@pedulibersama.local",
    role: "admin",
  },
  {
    id: 2,
    name: "Budi Donatur",
    email: "budi@example.com",
    role: "donatur",
  },
];

const defaultDisasters = [
  {
    id: 1,
    title: "Banjir Bandung",
    location: "Bandung",
    description: "Banjir merendam beberapa wilayah pemukiman.",
    needs: "Makanan, selimut, obat-obatan",
    status: "aktif",
    image: "",
  },
  {
    id: 2,
    title: "Gempa Cianjur",
    location: "Cianjur",
    description: "Bantuan logistik dan relawan masih dibutuhkan.",
    needs: "Tenda, air bersih, makanan siap saji",
    status: "selesai",
    image: "",
  },
];

const defaultDonations = [
  {
    id: 1,
    user: { id: 2, name: "Budi Donatur" },
    disaster: { id: 1, title: "Banjir Bandung" },
    amount: 500000,
    payment_method: "Transfer Bank",
    proof: "",
    status: "pending",
  },
  {
    id: 2,
    user: { id: 2, name: "Budi Donatur" },
    disaster: { id: 2, title: "Gempa Cianjur" },
    amount: 250000,
    payment_method: "E-Wallet",
    proof: "",
    status: "berhasil",
  },
];

const defaults = {
  [STORAGE_KEYS.users]: defaultUsers,
  [STORAGE_KEYS.disasters]: defaultDisasters,
  [STORAGE_KEYS.donations]: defaultDonations,
};

const isBrowser = () => typeof window !== "undefined";

const clone = (value) => JSON.parse(JSON.stringify(value));

export const getCollection = (key) => {
  const fallback = defaults[key] ?? [];

  if (!isBrowser()) {
    return clone(fallback);
  }

  const raw = localStorage.getItem(key);

  if (!raw) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return clone(fallback);
  }

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.setItem(key, JSON.stringify(fallback));
    return clone(fallback);
  }
};

export const saveCollection = (key, data) => {
  if (isBrowser()) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  return clone(data);
};

export const getNextId = (items) =>
  items.reduce((maxId, item) => Math.max(maxId, Number(item.id) || 0), 0) + 1;

export const toResponse = (data) => ({ data });

export const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(new Error("Gagal membaca file"));
    reader.readAsDataURL(file);
  });

export const STORAGE = STORAGE_KEYS;
