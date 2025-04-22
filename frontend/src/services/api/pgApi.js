import { axiosInstance } from "../../lib/axiosInstance";

export const getAllPgs = async () => {
  const results = await axiosInstance.get("/pgs");
  return results.data;
};


