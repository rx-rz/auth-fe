import { z } from "zod";

export const GetWebAuthnCredentialsSchema = z.object({
  username: z.string().min(1, { message: "Username cannot be empty" }),
  credential: z.object(
    {
      id: z.string().min(1, { message: "Credential ID is required" }),
      publicKey: z.string().min(1, { message: "Public key is required" }),
      algorithm: z.enum(["RS256", "ES256"], {
        errorMap: () => ({
          message: "Algorithm must be either 'RS256' or 'ES256'",
        }),
      }),
    },
    { required_error: "Credential information is required" }
  ),
  authenticatorData: z
    .string()
    .min(1, { message: "Authenticator data is required" }),
  clientData: z.string().min(1, { message: "Client data is required" }),
  attestationData: z.string().optional(),
});

export type GetWebAuthnCredentialsDto = z.infer<
  typeof GetWebAuthnCredentialsSchema
>;

export const VerifyMfaRegistrationSchema = z.object({
  email: z.string().email(),
  options: z.object({
    id: z.string(),
    rawId: z.string(),
    response: z.object({
      attestationObject: z.string(),
      clientDataJSON: z.string(),
      transports: z.array(z.string()),
      publicKeyAlgorithm: z.string(),
      publicKey: z.string(),
      authenticatorData: z.string(),
    }),

    clientExtensionResults: z.object({
      credProps: z.object({
        rk: z.boolean(),
      }),
    }),
    authenticatorAttachment: z.string(),
    type: z.string(),
  }),
});

export type VerifyMfaRegistrationDto = z.infer<
  typeof VerifyMfaRegistrationSchema
>;

export const EmailSchema = z.object({
  email: z
    .string({ required_error: "Email required" })
    .email({ message: "Invalid email provided" }),
});

export type EmailDto = z.infer<typeof EmailSchema>;
