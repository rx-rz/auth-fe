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

export type GetMfaAuthenticationOptionsResponse = {
  options: {
    rpId: string;
    challenge: string;
    allowCredentials: {
      id: string;
      transports: ("internal" | "nfc" | "ble" | "usb")[];
      type: "public-key";
    }[];
    timeout: number;
    userVerification: "preferred" | "required" | "discouraged";
  };
  success: boolean;
};

export type VerifyMfaAuthenticationResponse = RegisterAdminResponse;

export type GetOTPResponse = {
  otpDetails: {
    email: string;
    createdAt: Date;
    code: string;
    expiresAt: Date;
  };
  success: boolean;
  mailError: any;
  mailResponse: any;
};

export type VerifyAdminOTPResponse = RegisterAdminResponse;
