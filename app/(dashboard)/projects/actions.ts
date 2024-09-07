import { handleApiCall } from "@/lib/utils";
import * as ProjectFormTypes from "@/schemas/project.schemas";
import * as RoleFormTypes from "@/schemas/rbac.schemas";
import * as ResponseTypes from "./response-types";

import { api } from "@/lib/axios";

export const createProjectAction = (
  body: ProjectFormTypes.CreateProjectDto
) => {
  return handleApiCall<ResponseTypes.CreateProjectResponse>(
    api.post("/project/create-project", body)
  );
};

export const updateProjectNameAction = (
  body: ProjectFormTypes.UpdateProjectNameDto
) => {
  return handleApiCall<ResponseTypes.UpdateProjectNameResponse>(
    api.put("/project/update-project-name", body)
  );
};

export const getProjectKeysAction = ({
  projectId,
}: ProjectFormTypes.ProjectIdDto) => {
  return handleApiCall<ResponseTypes.GetProjectKeysResponse>(
    api.get("/project/get-keys", {
      params: { projectId },
    })
  );
};

export const getAllAdminProjectsAction = ({ email }: { email: string }) => {
  return handleApiCall<ResponseTypes.GetAllProjectsCreatedByAdminResponse>(
    api.get("/project/get-admin-projects", {
      params: { email },
    })
  );
};

export const deleteProjectAction = ({
  projectId,
}: ProjectFormTypes.ProjectIdDto) => {
  return handleApiCall<ResponseTypes.DeleteProjectResponse>(
    api.delete("/project/delete-project", {
      params: { projectId },
    })
  );
};

export const createRoleAction = (body: RoleFormTypes.CreateRoleDto) => {
  return handleApiCall<ResponseTypes.CreateRoleResponse>(
    api.post("/role/create-role", body)
  );
};

export const updateRoleNameAction = (body: RoleFormTypes.UpdateRoleNameDto) => {
  return handleApiCall<ResponseTypes.UpdateRoleNameResponse>(
    api.put("/role/update-role-name", body)
  );
};

export const deleteRoleAction = ({ roleId }: RoleFormTypes.RoleIdDto) => {
  return handleApiCall<ResponseTypes.DeleteRoleResponse>(
    api.delete("/role/delete-role", {
      params: { roleId },
    })
  );
};

export const createPermissionAction = (body: RoleFormTypes.CreatePermissionDto) => {
  return handleApiCall<ResponseTypes.CreatePermissionResponse>(
    api.post("/permission/create-permission", body)
  );
};

export const updatePermissionAction = (body: RoleFormTypes.UpdatePermissionDto) => {
  return handleApiCall<ResponseTypes.UpdatePermissionResponse>(
    api.put('/permission/update-permission', body)
  )
}

export const assignPermissionToRoleAction = (
  body: RoleFormTypes.AssignPermissionToRoleDto
) => {
  return handleApiCall<ResponseTypes.AssignPermissionToRoleResponse>(
    api.post("/permission/assign-permission-to-role", body)
  );
};

export const deletePermissionAction = ({
  permissionId,
}: {
  permissionId: string;
}) => {
  return handleApiCall<ResponseTypes.DeletePermissionResponse>(
    api.delete("/permission/delete-permission", {
      params: { permissionId },
    })
  );
};
