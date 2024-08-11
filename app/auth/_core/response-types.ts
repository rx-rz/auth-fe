export type RegisterAdminResponse = {
  message: string;
  success: boolean;
};

export type LoginAdminReponse = RegisterAdminResponse & { accessToken: string };

export type GetChallengeResponse = {
  success: string;
  challenge: string;
};

export type VerifyChallengeResponse = RegisterAdminResponse;
