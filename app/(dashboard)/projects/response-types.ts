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
    createdAt: Date;
    updatedAt: Date;
    rolePermissions: {
      permission: {
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        projectId: string;
        updatedAt: Date;
      };
    }[];
  }[];
};

export type CreateRoleResponse = {
  success: boolean;
  role: {
    id: string;
    name: string;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type GetRoleDetailsResponse = {
  success: boolean;
  role: {
    id: string;
    name: string;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
    rolePermissions: {
      roleId: string;
      permissionId: string;
    }[];
  } | null;
};

export type UpdateRoleNameResponse = {
  success: boolean;
  role: {
    id: string;
    name: string;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type DeleteRoleResponse = {
  success: boolean;
  role: any;
};

export type CreatePermissionResponse = {
  success: boolean;
  permission: {
    id: string;
    name: string;
    description: string | null;
    projectId: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type GetProjectPermissionsResponse = {
  success: boolean;
  permissions: {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    projectId: string | null;
  }[];
};

export type AssignPermissionToRoleResponse = {
  success: boolean;
  permission: {
    permission: {
      id: string;
      name: string;
    };
    role: {
      id: string;
      name: string;
    };
  };
};

export type UpdatePermissionResponse = {
  success: boolean;
  permission: {
    id: string;
    name: string;
    description: string | null;
    projectId: string;
    rolePermissions: {
      roleId: string;
    }[];
  };
};

export type RemovePermissionFromRoleResponse = {
  success: boolean;
  permission: {
    roleId: string;
    permissionId: string;
  };
};

export type DeletePermissionResponse = {
  success: boolean;
  permission: any;
};
