import { api } from "@/lib/axios";
import { LoginAdminDto, RegisterAdminDto } from "@/schemas/admin.schemas";
import * as ResponseTypes from "./response-types";
import {
  AuthenticationResponseJSON,
  RegistrationResponseJSON,
} from "@simplewebauthn/types";
import { CreateOtpDto, VerifyAdminOtpDto } from "@/schemas/otp.schemas";
import { handleApiCall } from "@/lib/utils";

export const registerAdminAction = async (body: RegisterAdminDto) => {
  const { confirmPassword, ...data } = body;
  return handleApiCall<ResponseTypes.RegisterAdminResponse>(
    api.post("/admin/register", data)
  );
};

export const loginAdminAction = async (body: LoginAdminDto) => {
  return handleApiCall<ResponseTypes.LoginAdminReponse>(
    api.post("/admin/login", body)
  );
};

export const getMfaRegistrationOptionsAction = async (email: string) => {
  return handleApiCall<ResponseTypes.GetMfaRegistrationOptionsResponse>(
    api.get("/mfa/get-registration-options", {
      params: { email },
    })
  );
};

export const verifyMfaRegistrationOptionsAction = async ({
  email,
  options,
  webAuthnUserId,
}: {
  email: string;
  options: RegistrationResponseJSON;
  webAuthnUserId: string;
}) => {
  const body = { email, options, webAuthnUserId };
  return handleApiCall<ResponseTypes.VerifyMfaRegistrationResponse>(
    api.post("/mfa/verify-registration-options", body)
  );
};

export const getMfaAuthenticationOptionsAction = async (email: string) => {
  return handleApiCall<ResponseTypes.GetMfaAuthenticationOptionsResponse>(
    api.get("/mfa/get-authentication-options", {
      params: { email },
    })
  );
};

export const verifyMfaAuthenticationOptionsAction = async ({
  email,
  options,
}: {
  email: string;
  options: AuthenticationResponseJSON;
}) => {
  const body = { email, ...options };
  return handleApiCall<ResponseTypes.VerifyMfaAuthenticationResponse>(
    api.post("/mfa/verify-authentication-options", body)
  );
};

export const getOTPAction = async (body: CreateOtpDto) => {
  return handleApiCall<ResponseTypes.GetOTPResponse>(
    api.post("/otp/send-otp", body)
  );
};

export const verifyAdminOTPAction = async (body: VerifyAdminOtpDto) => {
  return handleApiCall<ResponseTypes.VerifyAdminOTPResponse>(
    api.post("/otp/verify-admin-otp", body)
  );
};

export const resetAdminPasswordAction = async (body: {
  email: string;
  newPassword: string;
}) => {
  return handleApiCall<ResponseTypes.ResetAdminPasswordResponse>(
    api.put("/admin/reset-password", body)
  );
};
