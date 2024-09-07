import { useUserStore } from "@/store/user.store";
import {
  GetAdminProjectsResponse,
  GetProjectKeysResponse,
  GetProjectPermissionsResponse,
  GetProjectResponse,
  GetProjectRolesResponse,
} from "./response-types";
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

export const getProjectRolesQuery = ({ projectId }: { projectId: string }) => {
  const { showToast } = useShowToast();
  let roles;
  const fetcher = (url: string): Promise<GetProjectRolesResponse> => {
    return api.get(url, {
      params: { projectId },
    });
  };
  const {
    data,
    isLoading: rolesAreLoading,
    error,
  } = useSWR(projectId ? "/project/get-project-roles" : null, fetcher);
  if (error) {
    showToast({ error });
  }
  if (data) {
    roles = data.roles;
  }
  return { roles, rolesAreLoading };
};

export const getProjectPermissionsQuery = ({
  projectId,
}: {
  projectId: string;
}) => {
  const { showToast } = useShowToast();
  let permissions;
  const fetcher = (url: string): Promise<GetProjectPermissionsResponse> => {
    return api.get(url, {
      params: { projectId },
    });
  };
  const {
    data,
    isLoading: permissionsAreLoading,
    error,
  } = useSWR(
    projectId ? "/permissions/get-project-permissions" : null,
    fetcher
  );
  if (error) showToast({ error });
  if (data) {
    permissions = data.permissions;
  }
  return { permissions, permissionsAreLoading };
};
