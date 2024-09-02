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

export type LogoutAdminResponse = {
  success: boolean;
  message: string;
};

export type CreateProjectResponse = {
  success: boolean;
  project: {
    id: string;
    name: string;
    createdAt: Date;
    adminId: string;
  };
};

export type UpdateProjectNameResponse = CreateProjectResponse;

export type GetProjectKeysResponse = {
  success: boolean;
  clientKey: string;
  apiKey: string;
};

export type GetAdminProjectsResponse = {
  success: boolean;
  adminProjects: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
  }[];
};

export type GetProjectResponse = {
  success: boolean;
  project: {
    name: string;
    adminId: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type GetProjectRefreshTokensResponse = {
  success: boolean;
  refreshTokens:
    | {
        id: string;
        createdAt: Date;
        userId: string | null;
        token: string;
        state: "ACTIVE" | "EXPIRED" | "REVOKED" | "BLACKLISTED";
        authMethod:
          | "GOOGLE_OAUTH"
          | "GITHUB_OAUTH"
          | "FACEBOOK_OAUTH"
          | "EMAIL_AND_PASSWORD_SIGNIN"
          | "MAGICLINK";
      }[]
    | null;
};

export type GetAllProjectsCreatedByAdminResponse = {
  success: boolean;
  projects: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export type DeleteProjectResponse = {
  success: boolean;
  project: {
    id: string;
    name: string;
  };
};

export type GetProjectRolesResponse = {
  success: boolean;
  roles: {
    id: string;
    name: string;
    rolePermissions: {
      permission: {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
      };
    }[];
  }[];
};
