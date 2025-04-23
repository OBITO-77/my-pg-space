import { axiosInstance } from "../../lib/axiosInstance";

export const getAllPgs = async () => {
  const results = await axiosInstance.get("/pgs");
  return results.data;
};

export const createPg = async (data)=>{
  const res = await axiosInstance.post("/pgs",data)
  return res.data
}
