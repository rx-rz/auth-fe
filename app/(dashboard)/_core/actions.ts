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

export async function updateAdminEmail(body: UpdateAdminEmailDto) {
  let error;
  let response: UpdateAdminEmailResponse | undefined;
  try {
    response = await api.post("/admin/update-admin-email", body);
  } catch (err) {
    if (err instanceof Error) error = err;
  }
  return { error, response };
}

export async function updateAdminPassword(body: UpdateAdminPasswordDto) {
  let error;
  let response: UpdateAdminPasswordResponse | undefined;
  try {
    response = await api.post("/admin/update-admin-password", body);
  } catch (err) {
    if (err instanceof Error) error = err;
  }
  return { error, response };
}

export async function updateAdminDetails(body: UpdateAdminDto) {
  let error;
  let response: UpdateAdminDetailsResponse | undefined;
  try {
    response = await api.post('/admin/update-admin', body)
  } catch (err) {
    if (err instanceof Error) error = err;
  }
  return { error, response };
}
