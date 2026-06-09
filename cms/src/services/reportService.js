import api from "./api";
import { getCollection, STORAGE, toResponse } from "./localData";

export const getDonationReports = async () => {
  try {
    return await api.get("/reports/donations");
  } catch {
    return toResponse(getCollection(STORAGE.donations));
  }
};
