import { handleApiCall } from "@/lib/utils";
import * as FormTypes from "@/schemas/project.schemas";
import * as ResponseTypes from "../_core";
import { CreateProjectResponse } from "../_core";
import { api } from "@/lib/axios";

export const createProject = (body: FormTypes.CreateProjectDto) => {
  return handleApiCall<CreateProjectResponse>(
    api.post("/project/create-project", body)
  );
};

export const updateProjectName = (body: FormTypes.UpdateProjectNameDto) => {
  return handleApiCall<ResponseTypes.UpdateProjectNameResponse>(
    api.post("/project/update-project-name", body)
  );
};

export const getProjectKeys = ({ projectId }: FormTypes.ProjectIdDto) => {
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

export const deleteProject = ({ projectId }: FormTypes.ProjectIdDto) => {
  return handleApiCall<ResponseTypes.DeleteProjectResponse>(
    api.delete("/project/delete-project", {
      params: { projectId },
    })
  );
};
