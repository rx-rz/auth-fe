type Admin = {
  email: string;
  id: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  mfaEnabled: boolean;
};
type Success = boolean;

export type UpdateAdminEmailResponse = {
  success: Success;
  admin: Admin;
};

export type UpdateAdminPasswordResponse = {
  success: boolean;
  admin: Admin;
};

export type UpdateAdminDetailsResponse = {
  success: boolean;
  admin: Admin;
};
