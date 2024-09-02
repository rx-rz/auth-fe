import { api } from "@/lib/axios";
import {
  GetAdminProjectsResponse,
  GetProjectResponse,
  UpdateProjectNameResponse,
} from "./response-types";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useUserStore } from "@/store/user.store";
import { UpdateProjectNameDto } from "@/schemas/project.schemas";

export const getAdminProjects = () => {
  const { user } = useUserStore();

  const fetcher = (url: string): Promise<GetAdminProjectsResponse> => {
    return api.get(url, {
      params: { email: user.email },
    });
  };
  const {
    data,
    isLoading: projectsIsLoading,
    error,
  } = useSWR(user.email ? "/admin/get-projects" : null, fetcher);
  console.log({ data, error });
  return { data, projectsIsLoading, error };
};

export const getProjectDetails = ({ id }: { id: string | string[] }) => {
  const fetcher = (url: string): Promise<GetProjectResponse> => {
    return api.get(url, {
      params: { projectId: id },
    });
  };
  const {
    data,
    isLoading: projectIsLoading,
    error,
  } = useSWR(id ? "/project/get-project" : null, fetcher);

  return { data, projectIsLoading, error };
};

export const updateProjectName = () => {
  const fetcher = (
    url: string,
    { arg }: { arg: UpdateProjectNameDto }
  ): Promise<UpdateProjectNameResponse> => {
    return api.put(url, arg);
  };

  const {
    data,
    trigger: updateName,
    isMutating: loading,
  } = useSWRMutation("/project/update-project-name", fetcher, {
    onSuccess: () => {
      location.reload();
    },
  });
  return { data, updateName, loading };
};
