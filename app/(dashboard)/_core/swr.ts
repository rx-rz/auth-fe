import { api } from "@/lib/axios";
import { GetAdminProjectsResponse } from "./response-types";
import useSWR from "swr";
import { useUserStore } from "@/store/user.store";

export const getAdminProjects = () => {
  const { user } = useUserStore();

  const fetcher = (url: string): Promise<GetAdminProjectsResponse> => {
    return api.get(url, {
      params: { email: user.email },
      withCredentials: true,
    });
  };
  const {
    data,
    isLoading: projectsIsLoading,
    error,
  } = useSWR(user ? "/admin/get-projects" : null, fetcher);
  return { data, projectsIsLoading, error };
};
