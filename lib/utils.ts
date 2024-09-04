import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { APIError } from "./errors";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type User = {
  email: string;
  firstName: string;
  isVerified: boolean;
  lastName: string;
  id: string;
  role: "admin";
  mfaEnabled: boolean;
};

export function decodeUserToken(token: string | undefined) {
  if (token) {
    const user = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    ) as User;
    return user;
  }
}

export async function handleApiCall<T>(
  apiCall: Promise<T>
): Promise<{ error: APIError | undefined; response: T | undefined }> {
  let error;
  let response: T | undefined;
  try {
    response = await apiCall;
  } catch (err) {
    if (err instanceof APIError) error = err;
  }
  return { error, response };
}