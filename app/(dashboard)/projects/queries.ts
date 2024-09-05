import { useUserStore } from "@/store/user.store";
import {
  GetAdminProjectsResponse,
  GetProjectKeysResponse,
  GetProjectResponse,
} from "../_core";
import { api } from "@/lib/axios";
import useSWR from "swr";
import { useShowToast } from "@/lib/hooks";

export const getAdminProjectsQuery = () => {
  const { user } = useUserStore();
  const { showToast } = useShowToast();
  let projects;
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
  if (error) {
    console.log(error);
    showToast({ error });
  }
  if (data) {
    projects = data.adminProjects;
  }
  return { projects, projectsIsLoading, error };
};

export const getProjectDetailsQuery = ({ id }: { id: string }) => {
  const { showToast } = useShowToast();
  let project;
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
  if (error) {
    showToast({ error });
  }
  if (data) {
    project = data.project;
  }

  return { project, projectIsLoading, error };
};

export const getProjectKeysQuery = ({
  id,
  getKeys,
}: {
  id: string;
  getKeys?: boolean;
}) => {
  const { showToast } = useShowToast();
  let projectKeys;
  const fetcher = (url: string): Promise<GetProjectKeysResponse> => {
    return api.get(url, {
      params: { projectId: id },
    });
  };
  const {
    data,
    isLoading: projectKeysIsLoading,
    error,
  } = useSWR(getKeys ? "/project/get-keys" : null, fetcher);
  if (error) {
    showToast({ error });
  }
  if (data) {
    projectKeys = { apiKey: data.apiKey, clientKey: data.clientKey };
  }
  return { projectKeys, projectKeysIsLoading, error };
};
