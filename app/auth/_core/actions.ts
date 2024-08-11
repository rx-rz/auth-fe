import { api } from "@/lib/axios";
import { LoginAdminDto, RegisterAdminDto } from "@/schemas/admin.schemas";
import {
  GetChallengeResponse,
  LoginAdminReponse,
  RegisterAdminResponse,
  VerifyChallengeResponse,
} from "./response-types";
import { VerifyChallengeDto } from "@/schemas/mfa.schemas";

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

export async function getChallenge() {
  let error;
  let response: GetChallengeResponse | undefined;
  try {
    response = await api.get("/mfa/get-challenge");
  } catch (err) {
    if (err instanceof Error) error = err;
  }
  return { error, response };
}

export async function sendWebAuthnCredentialsToServer(
  body: VerifyChallengeDto
) {
  let error;
  let response: VerifyChallengeResponse | undefined;
  try {
    response = await api.post("/mfa/verify-challenge", body);
  } catch (err) {
    if (err instanceof Error) error = err;
  }
  return { error, response };
}
