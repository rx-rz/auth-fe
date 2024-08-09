import axios from "axios";

export const api = axios.create({
  withCredentials: true,
  baseURL:
    typeof window === "undefined"
      ? process.env.API_URL
      : process.env.NEXT_PUBLIC_API_URL,
});
api.interceptors.request.use((request) => {
  console.log({ request });
  return request;
});
api.interceptors.response.use(
  (response) => {
    console.log({ res: response.request });
    return response.data;
  },
  (error) => {
    if (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
);
