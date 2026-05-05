import api from "./api";

export const getDonations = () => api.get("/donations");
export const verifyDonation = (id) => api.patch(`/donations/${id}/verify`);