import api from "./api";
import {
  getCollection,
  saveCollection,
  STORAGE,
  toResponse,
} from "./localData";

// GET ALL DONATIONS
export const getDonations = async () => {
  try {
    return await api.get("/donations");
  } catch {
    return toResponse(getCollection(STORAGE.donations));
  }
};

// VERIFY DONATION
export const verifyDonation = async (id) => {
  try {
    return await api.patch(`/donations/${id}/verify`);
  } catch {
    const donations = getCollection(STORAGE.donations);
    const nextDonations = donations.map((item) =>
      String(item.id) === String(id) ? { ...item, status: "berhasil" } : item
    );
    const updatedDonation = nextDonations.find(
      (item) => String(item.id) === String(id)
    );

    saveCollection(STORAGE.donations, nextDonations);
    return toResponse(updatedDonation);
  }
};

// REJECT DONATION
export const rejectDonation = async (id) => {
  try {
    return await api.patch(`/donations/${id}/reject`);
  } catch {
    const donations = getCollection(STORAGE.donations);
    const nextDonations = donations.map((item) =>
      String(item.id) === String(id) ? { ...item, status: "ditolak" } : item
    );
    const updatedDonation = nextDonations.find(
      (item) => String(item.id) === String(id)
    );

    saveCollection(STORAGE.donations, nextDonations);
    return toResponse(updatedDonation);
  }
};
