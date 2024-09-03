import { api } from "@/lib/axios";
import {
  GetAdminProjectsResponse,
  GetProjectResponse,
  UpdateProjectNameResponse,
} from "./response-types";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useUserStore } from "@/store/user.store";
import { ProjectIdDto, UpdateProjectNameDto } from "@/schemas/project.schemas";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export const getAdminProjectsQuery = () => {
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

export const getProjectDetailsQuery = ({ id }: { id: string | string[] }) => {
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

export const updateProjectNameMutation = () => {
  const fetcher = (
    url: string,
    { arg }: { arg: UpdateProjectNameDto }
  ): Promise<UpdateProjectNameResponse> => {
    return api.put(url, arg);
  };

  const { trigger: updateProjectName, isMutating: loading } = useSWRMutation(
    "/project/update-project-name",
    fetcher,
    {
      onSuccess: () => {
        location.reload();
      },
    }
  );
  return { updateProjectName, loading };
};

export const deleteProjectMutation = () => {
  const router = useRouter();
  const fetcher = (url: string, { arg }: { arg: ProjectIdDto }) => {
    return api.delete(url, {
      params: { projectId: arg.projectId },
    });
  };

  const { trigger: deleteProject, isMutating: loading } = useSWRMutation(
    "/project/delete-project",
    fetcher,
    {
      onSuccess: () => {
        router.push(ROUTES.PROJECTS);
      },
    }
  );
  return { deleteProject, loading };
};
