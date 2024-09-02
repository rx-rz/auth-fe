import { api } from "@/lib/axios";
import { LoginAdminDto, RegisterAdminDto } from "@/schemas/admin.schemas";
import {
  GetMfaAuthenticationOptionsResponse,
  GetMfaRegistrationOptionsResponse,
  GetOTPResponse,
  LoginAdminReponse,
  RegisterAdminResponse,
  ResetAdminPasswordResponse,
  VerifyAdminOTPResponse,
  VerifyMfaAuthenticationResponse,
  VerifyMfaRegistrationResponse,
} from "./response-types";
import {
  AuthenticationResponseJSON,
  RegistrationResponseJSON,
} from "@simplewebauthn/types";
import { APIError } from "@/lib/errors";
import {
  CreateOtpDto,
  CreateOtpSchema,
  VerifyAdminOtpDto,
} from "@/schemas/otp.schemas";

export async function registerAdmin(body: RegisterAdminDto) {
  const { confirmPassword, ...data } = body;
  let error;
  let response: RegisterAdminResponse | undefined;
  try {
    response = await api.post("/admin/register", data);
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}

export async function loginAdmin(body: LoginAdminDto) {
  let error;
  let response: LoginAdminReponse | undefined;
  try {
    response = await api.post("/admin/login", body);
  } catch (err) {
    if (err instanceof APIError) error = err;
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
    if (err instanceof APIError) error = err;
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
  let response: VerifyMfaRegistrationResponse | undefined;
  const body = { email, options, webAuthnUserId };

  try {
    response = await api.post("/mfa/verify-registration-options", body);
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}

export async function getMfaAuthenticationOptions(email: string) {
  let error;
  let response: GetMfaAuthenticationOptionsResponse | undefined;
  try {
    response = await api.get("/mfa/get-authentication-options", {
      params: { email },
    });
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}

export async function verifyMfaAuthenticationOptions({
  email,
  options,
}: {
  email: string;
  options: AuthenticationResponseJSON;
}) {
  let error;
  let response: VerifyMfaAuthenticationResponse | undefined;
  const body = { email, ...options };
  try {
    response = await api.post("/mfa/verify-authentication-options", body);
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}

export async function getOTP(body: CreateOtpDto) {
  let error;
  let response: GetOTPResponse | undefined;
  try {
    response = await api.post("/otp/send-otp", body);
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}

export async function verifyAdminOTP(body: VerifyAdminOtpDto) {
  let error;
  let response: VerifyAdminOTPResponse | undefined;
  try {
    response = await api.post("/otp/verify-admin-otp", body);
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}

export async function resetAdminPassword(body: {
  email: string;
  newPassword: string;
}) {
  let error;
  let response: ResetAdminPasswordResponse | undefined;
  try {
    response = await api.put("/admin/reset-password", body);
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}
