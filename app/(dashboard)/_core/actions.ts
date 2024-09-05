import { CreateRoleResponse } from "./response-types";
import { api } from "@/lib/axios";
import { APIError } from "@/lib/errors";
import { CreateRoleDto } from "@/schemas/rbac.schemas";

export async function createRole(body: CreateRoleDto) {
  let error;
  let response: CreateRoleResponse | undefined;
  try {
    response = await api.post("/role/create-role", body);
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}
