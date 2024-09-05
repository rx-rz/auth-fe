import { handleApiCall } from "@/lib/utils";
import * as ProjectFormTypes from "@/schemas/project.schemas";
import * as RoleFormTypes from "@/schemas/rbac.schemas";
import * as ResponseTypes from "../_core";
import { CreateProjectResponse } from "../_core";
import { api } from "@/lib/axios";

export const createProject = (body: ProjectFormTypes.CreateProjectDto) => {
  return handleApiCall<CreateProjectResponse>(
    api.post("/project/create-project", body)
  );
};

export const updateProjectName = (
  body: ProjectFormTypes.UpdateProjectNameDto
) => {
  return handleApiCall<ResponseTypes.UpdateProjectNameResponse>(
    api.put("/project/update-project-name", body)
  );
};

export const getProjectKeys = ({
  projectId,
}: ProjectFormTypes.ProjectIdDto) => {
  return handleApiCall<ResponseTypes.GetProjectKeysResponse>(
    api.get("/project/get-keys", {
      params: { projectId },
    })
  );
};

export const getAllAdminProjects = ({ email }: { email: string }) => {
  return handleApiCall<ResponseTypes.GetAllProjectsCreatedByAdminResponse>(
    api.get("/project/get-admin-projects", {
      params: { email },
    })
  );
};

export const deleteProject = ({ projectId }: ProjectFormTypes.ProjectIdDto) => {
  return handleApiCall<ResponseTypes.DeleteProjectResponse>(
    api.delete("/project/delete-project", {
      params: { projectId },
    })
  );
};

export const createRole = (body: RoleFormTypes.CreateRoleDto) => {
  return handleApiCall<ResponseTypes.CreateRoleResponse>(
    api.post("/role/create-role", body)
  );
};

export const updateRoleName = (body: RoleFormTypes.UpdateRoleNameDto) => {
  return handleApiCall<ResponseTypes.UpdateRoleNameResponse>(
    api.put("/role/update-role-name", body)
  );
};

export const deleteRole = ({ roleId }: RoleFormTypes.RoleIdDto) => {
  return handleApiCall<ResponseTypes.DeleteRoleResponse>(
    api.delete("/role/delete-role", {
      params: { roleId },
    })
  );
};
