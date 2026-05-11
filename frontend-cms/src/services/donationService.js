import api from "./api";

// GET ALL DONATIONS
export const getDonations = async () => {
  return await api.get("/donations");
};

// VERIFY DONATION
export const verifyDonation = async (id) => {
  return await api.patch(`/donations/${id}/verify`);
};

// REJECT DONATION
export const rejectDonation = async (id) => {
  return await api.patch(`/donations/${id}/reject`);
};