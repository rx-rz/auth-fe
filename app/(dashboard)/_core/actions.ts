import {
  AdminEmailDto,
  AdminIdDto,
  UpdateAdminDto,
  UpdateAdminEmailDto,
  UpdateAdminPasswordDto,
} from "@/schemas/admin.schemas";
import {
  CreateProjectResponse,
  CreateRoleResponse,
  DeleteProjectResponse,
  GetAllProjectsCreatedByAdminResponse,
  GetProjectKeysResponse,
  LogoutAdminResponse,
  UpdateAdminDetailsResponse,
  UpdateAdminEmailResponse,
  UpdateAdminPasswordResponse,
  UpdateProjectNameResponse,
} from "./response-types";
import { api } from "@/lib/axios";
import { APIError } from "@/lib/errors";
import {
  CreateProjectDto,
  ProjectIdDto,
  UpdateProjectNameDto,
} from "@/schemas/project.schemas";
import { CreateRoleDto } from "@/schemas/rbac.schemas";

// ADMIN

export async function updateAdminEmail(body: UpdateAdminEmailDto) {
  let error;
  let response: UpdateAdminEmailResponse | undefined;
  try {
    response = await api.put("/admin/update-email", body);
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}

export async function updateAdminPassword(body: UpdateAdminPasswordDto) {
  let error;
  let response: UpdateAdminPasswordResponse | undefined;
  try {
    response = await api.put("/admin/update-password", body);
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}

export async function updateAdminDetails(body: UpdateAdminDto) {
  let error;
  let response: UpdateAdminDetailsResponse | undefined;
  try {
    response = await api.put("/admin/update-details", body);
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}

export async function logoutAdmin() {
  let error;
  let response: LogoutAdminResponse | undefined;
  try {
    response = await api.get("/admin/logout");
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}

// PROJECTS

export async function createProject(body: CreateProjectDto) {
  let error;
  let response: CreateProjectResponse | undefined;
  try {
    response = await api.post("/project/create-project", body);
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}

export async function updateProjectName(body: UpdateProjectNameDto) {
  let error;
  let response: UpdateProjectNameResponse | undefined;
  try {
    response = await api.post("/project/update-project-name", body);
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}

export async function getProjectKeys({ projectId }: ProjectIdDto) {
  let error;
  let response: GetProjectKeysResponse | undefined;
  try {
    response = await api.get("/project/get-keys", {
      params: { projectId },
    });
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}

// since the get all admin projects function will be called in a server component, the access
// token has to be programatically passed in since the cookies needed are browser only and
// cannot be accessed from the server.
export async function getAllAdminProjects({ email }: AdminEmailDto) {
  let error;
  let response: GetAllProjectsCreatedByAdminResponse | undefined;
  try {
    response = await api.get("/project/get-admin-projects");
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}

export async function deleteProject({ projectId }: ProjectIdDto) {
  let error;
  let response: DeleteProjectResponse | undefined;
  try {
    response = await api.delete("/project/delete-project", {
      params: { projectId },
    });
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}

export async function createRole(body: CreateRoleDto){
  let error;
  let response: CreateRoleResponse | undefined;
  try{
    response = await api.post('/role/create-role', body)
  }catch(err){
    if(err instanceof APIError) error = err;
  }
  return {error, response}
}