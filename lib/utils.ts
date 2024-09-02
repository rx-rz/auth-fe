import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
