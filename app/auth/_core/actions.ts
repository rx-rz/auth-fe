import { api } from "@/lib/axios";
import { LoginAdminDto, RegisterAdminDto } from "@/schemas/admin.schemas";

export async function registerAdmin(body: RegisterAdminDto) {
  const { confirmPassword, ...data } = body;
  let error;
  let response: any;
  try {
    response = await api.post("/admin/register", data);
  } catch (err) {
    if (err instanceof Error) error = err;
  }
  return { error, response };
}

export async function loginAdmin(body: LoginAdminDto) {
  let error;
  let response: any;
  const { confirmPassword, ...data } = body;
  try {
    response = await api.post("/admin/login", data);
  } catch (err) {
    if (err instanceof Error) error = err;
  }
  return { error, response };
}
