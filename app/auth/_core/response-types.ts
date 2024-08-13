export type RegisterAdminResponse = {
  message: string;
  success: boolean;
};

export type LoginAdminReponse = RegisterAdminResponse & { accessToken: string };



export type GetMfaRegistrationOptionsResponse = {
  options: {
    challenge: string;
    rp: {
      name: string;
      id: string;
    };
    user: {
      id: string;
      name: string;
      displayName: string;
    };
    pubKeyCredParams: {
      alg: any;
      type: any;
    }[];
    timeout: number;
    attestation: any;
    excludeCredentials: any[];
    authenticatorSelection: {
      residentKey: any;
      userVerification: any;
      authenticatorAttachment: any;
      requireResidentKey: any;
    };
    extensions: {
      credProps: any;
    };
  };
  success: boolean;
};

export type VerifyMfaRegistrationResponse = RegisterAdminResponse;
