import {
  UpdateAdminDto,
  UpdateAdminEmailDto,
  UpdateAdminPasswordDto,
} from "@/schemas/admin.schemas";
import {
  UpdateAdminDetailsResponse,
  UpdateAdminEmailResponse,
  UpdateAdminPasswordResponse,
} from "./response-types";
import { api } from "@/lib/axios";
import { APIError } from "@/lib/errors";

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
    response = await api.put('/admin/update-details', body)
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}
