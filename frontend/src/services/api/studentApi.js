import { axiosInstance } from "../../lib/axiosInstance";

export const getAllStudents = async () => {
  const results = await axiosInstance.get("/students");
  return results.data;
};

export const getStudentProfile = async () => {
  const results = await axiosInstance.get("/students/profile");
  return results;
};