import axios from "axios";
import { APIError } from "./errors";

export const api = axios.create({
  withCredentials: true,
  baseURL:
    typeof window === "undefined"
      ? process.env.API_URL
      : process.env.NEXT_PUBLIC_API_URL,
});
api.interceptors.request.use((request) => {
  return request;
});
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let apiError;
    if (axios.isAxiosError(error)) {
      apiError = new APIError(
        Number(error.response?.status.toString() || ""),
        error.response?.data?.message?.message || error.message
      );
    } else {
      apiError = new APIError(500, error.message || "Unknown error occured");
    }
    return Promise.reject(apiError);
  }
);
