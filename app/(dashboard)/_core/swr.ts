import { api } from "@/lib/axios";
import {
  DeleteRoleResponse,
  GetAdminProjectsResponse,
  GetProjectResponse,
  GetProjectRolesResponse,
  GetRoleDetailsResponse,
  UpdateProjectNameResponse,
} from "./response-types";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useUserStore } from "@/store/user.store";
import { ProjectIdDto, UpdateProjectNameDto } from "@/schemas/project.schemas";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import {
  AssignPermissionToRoleDto,
  CreatePermissionDto,
  CreateRoleDto,
  RoleIdDto,
  UpdateRoleNameDto,
} from "@/schemas/rbac.schemas";
import { useToast } from "@/components/ui/use-toast";
import { APIError } from "@/lib/errors";

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

export const createRoleMutation = () => {
  const { toast } = useToast();
  const fetcher = (url: string, { arg }: { arg: CreateRoleDto }) => {
    return api.post(url, arg);
  };
  const {
    trigger: createRole,
    isMutating: createRoleIsLoading,
    error,
  } = useSWRMutation("/role/create-role", fetcher, {
    onSuccess: () => {
      toast({
        title: "Role created successfully",
      });
      location.reload();
    },
    onError: (error) => {
      if (error instanceof APIError) {
        toast({
          title: error?.error,
          variant: "destructive",
        });
      }
    },
  });
  return { createRole, createRoleIsLoading };
};

export const getProjectRolesQuery = ({ projectId }: { projectId: string }) => {
  const { toast } = useToast();
  const fetcher = (url: string): Promise<GetProjectRolesResponse> => {
    return api.get(url, {
      params: { projectId },
    });
  };
  const {
    data,
    isLoading: rolesAreLoading,
    error,
  } = useSWR(projectId ? "/project/get-project-roles" : null, fetcher, {
    onError: () => {
      toast({
        title: error?.error,
        variant: "destructive",
      });
    },
  });
  return { data, rolesAreLoading };
};

export const updateRoleNameMutation = () => {
  const fetcher = (url: string, { arg }: { arg: UpdateRoleNameDto }) => {
    return api.put(url, arg);
  };
  const { trigger: updateRoleName, isMutating: updateRoleNameIsLoading } =
    useSWRMutation("/role/update-role-name", fetcher, {
      onSuccess: () => {
        location.reload();
      },
    });
  return { updateRoleName, updateRoleNameIsLoading };
};

export const getRoleDetailsQuery = ({ roleId }: { roleId: string }) => {
  const { toast } = useToast();
  const fetcher = (url: string): Promise<GetRoleDetailsResponse> => {
    return api.get(url, {
      params: {
        roleId,
      },
    });
  };

  const { data, isLoading } = useSWR("/role/get-role-details", fetcher, {
    onError: (error) => {
      if (error instanceof APIError) {
        toast({
          variant: "destructive",
          title: error?.error,
        });
      }
    },
  });

  return { data, isLoading };
};

export const deleteRoleMutation = ({ roleId }: { roleId: string }) => {
  const { toast } = useToast();
  const fetcher = (url: string) => {
    return api.delete(url, {
      params: { roleId },
    });
  };
  const { trigger: deleteRole, isMutating: deleteRoleIsLoading } =
    useSWRMutation("/role/delete-role", fetcher, {
      onSuccess: () => {
        toast({
          title: "Role deleted successfully",
        });
        location.reload();
      },
      onError: (error) => {
        if (error instanceof APIError) {
          toast({
            title: error.error,
            variant: "destructive",
          });
        }
      },
    });
  return { deleteRole, deleteRoleIsLoading };
};

export const createPermissionMutation = () => {
  const { toast } = useToast();
  const fetcher = (url: string, { arg }: { arg: CreatePermissionDto }) => {
    return api.post(url, arg);
  };

  const { trigger: createPermission, isMutating: createPermissionIsLoading } =
    useSWRMutation("/permission/create-permission", fetcher, {
      onSuccess: () => {
        toast({
          title: "Permission created successfully",
        });
      },
      onError: (error) => {
        if (error instanceof APIError) {
          toast({
            variant: "destructive",
            title: error.error,
          });
        }
      },
    });

  return { createPermission, createPermissionIsLoading };
};

export const deletePermissionMutation = ({
  permissionId,
}: {
  permissionId: string;
}) => {
  const { toast } = useToast();
  const fetcher = (url: string) => {
    return api.delete(url, {
      params: { permissionId },
    });
  };

  const { trigger: deletePermission, isMutating: deletePermissionIsLoading } =
    useSWRMutation("/permission/delete-permission", fetcher, {
      onSuccess: () => {
        toast({
          title: "Permission deleted successfully",
        });
      },
      onError: (error) => {
        if (error instanceof APIError)
          toast({
            title: error.error,
            variant: "destructive",
          });
      },
    });
  return { deletePermission, deletePermissionIsLoading };
};

export const assignPermissionToRoleMutation = () => {
  const { toast } = useToast();
  const fetcher = (
    url: string,
    { arg }: { arg: AssignPermissionToRoleDto }
  ) => {
    return api.post(url, arg);
  };
  const { trigger } = useSWRMutation(
    "/permission/assign-permission-to-role",
    fetcher,
    {
      onSuccess: () => {},
      onError: (error) => {
        if (error instanceof APIError)
          toast({
            title: error.error,
            variant: "destructive",
          });
      },
    }
  );
};
