import { api } from "@/lib/axios";
import { LoginAdminDto, RegisterAdminDto } from "@/schemas/admin.schemas";
import { LoginAdminReponse, RegisterAdminResponse } from "./response-types";

export async function registerAdmin(body: RegisterAdminDto) {
  const { confirmPassword, ...data } = body;
  let error;
  let response: RegisterAdminResponse | undefined;
  try {
    response = await api.post("/admin/register", data);
  } catch (err) {
    if (err instanceof Error) error = err;
  }
  return { error, response };
}

export async function loginAdmin(body: LoginAdminDto) {
  let error;
  let response: LoginAdminReponse | undefined;
  try {
    response = await api.post("/admin/login", body);
  } catch (err) {
    if (err instanceof Error) error = err;
  }
  return { error, response };
}
