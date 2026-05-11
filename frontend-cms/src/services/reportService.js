import api from "./api";

export const getDonationReports = async () => {
  return await api.get("/reports/donations");
};