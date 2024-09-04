import { api } from "@/lib/axios";
import { LoginAdminDto, RegisterAdminDto } from "@/schemas/admin.schemas";
import * as AuthResponseTypes from "./response-types";
import {
  AuthenticationResponseJSON,
  RegistrationResponseJSON,
} from "@simplewebauthn/types";
import { CreateOtpDto, VerifyAdminOtpDto } from "@/schemas/otp.schemas";
import { handleApiCall } from "@/lib/utils";

export async function registerAdmin(body: RegisterAdminDto) {
  const { confirmPassword, ...data } = body;
  return handleApiCall<AuthResponseTypes.RegisterAdminResponse>(
    api.post("/admin/register", data)
  );
}

export async function loginAdmin(body: LoginAdminDto) {
  return handleApiCall<AuthResponseTypes.LoginAdminReponse>(
    api.post("/admin/login", body)
  );
}

export async function getMfaRegistrationOptions(email: string) {
  return handleApiCall<AuthResponseTypes.GetMfaRegistrationOptionsResponse>(
    api.get("/mfa/get-registration-options", {
      params: { email },
    })
  );
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
  const body = { email, options, webAuthnUserId };
  return handleApiCall<AuthResponseTypes.VerifyMfaRegistrationResponse>(
    api.post("/mfa/verify-registration-options", body)
  );
}

export async function getMfaAuthenticationOptions(email: string) {
  return handleApiCall<AuthResponseTypes.GetMfaAuthenticationOptionsResponse>(
    api.get("/mfa/get-authentication-options", {
      params: { email },
    })
  );
}

export async function verifyMfaAuthenticationOptions({
  email,
  options,
}: {
  email: string;
  options: AuthenticationResponseJSON;
}) {
  const body = { email, ...options };
  return handleApiCall<AuthResponseTypes.VerifyMfaAuthenticationResponse>(
    api.post("/mfa/verify-authentication-options", body)
  );
}

export async function getOTP(body: CreateOtpDto) {
  return handleApiCall<AuthResponseTypes.GetOTPResponse>(
    api.post("/otp/send-otp", body)
  );
}

export async function verifyAdminOTP(body: VerifyAdminOtpDto) {
  return handleApiCall<AuthResponseTypes.VerifyAdminOTPResponse>(
    api.post("/otp/verify-admin-otp", body)
  );
}

export async function resetAdminPassword(body: {
  email: string;
  newPassword: string;
}) {
  return handleApiCall<AuthResponseTypes.ResetAdminPasswordResponse>(
    api.put("/admin/reset-password", body)
  );
}
