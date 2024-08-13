import { api } from "@/lib/axios";
import { LoginAdminDto, RegisterAdminDto } from "@/schemas/admin.schemas";
import {
  GetMfaRegistrationOptionsResponse,
  LoginAdminReponse,
  RegisterAdminResponse,
} from "./response-types";
import {
  GetWebAuthnCredentialsDto,
  VerifyMfaRegistrationDto,
} from "@/schemas/mfa.schemas";
import { RegistrationResponseJSON } from "@simplewebauthn/types";

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

export async function getMfaRegistrationOptions(email: string) {
  let error;
  let response: GetMfaRegistrationOptionsResponse | undefined;
  try {
    response = await api.get("/mfa/get-registration-options", {
      params: { email },
    });
  } catch (err) {
    if (err instanceof Error) error = err;
  }
  return { error, response };
}

export async function verifyMfaRegistrationOptions({
  email,
  options,
  webAuthnUserId,
}: {
  email: string;
  options: RegistrationResponseJSON;
  webAuthnUserId: string;
}) {
  let error;
  let response: VerifyMfaRegistrationDto | undefined;
  const body = { email, options, webAuthnUserId };

  try {
    response = await api.post("/mfa/verify-registration-options", body);
  } catch (err) {
    if (err instanceof Error) error = err;
  }
  return { error, response };
}
