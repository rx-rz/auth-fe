import { z } from "zod";

export type Permission = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  projectId: string | null;
};

export const CreateRoleSchema = z.object({
  name: z
    .string({ required_error: "Role name is required" })
    .max(50, "Role name cannot be longer than 255 characters"),
  projectId: z.string({ required_error: "Project ID is required" }),
});

export const RoleNameSchema = z.object({
  name: z
    .string({ required_error: "Role name is required" })
    .max(50, "Role name cannot be longer than 255 characters"),
});

export type CreateRoleDto = z.infer<typeof CreateRoleSchema>;

export const RoleIDSchema = z.object({
  roleId: z.string({ required_error: "Role ID is required" }),
});

export type RoleIdDto = z.infer<typeof RoleIDSchema>;

export const UpdateRoleNameSchema = z.object({
  name: z
    .string({ required_error: "Role name is required" })
    .max(50, "Role name cannot be longer than 255 characters"),
  roleId: z.string({ required_error: "Role ID is required" }),
});

export type UpdateRoleNameDto = z.infer<typeof UpdateRoleNameSchema>;

export const CreatePermissionSchema = z.object({
  name: z.string({ required_error: "Permission name is required" }).max(200, {
    message: "Permission name cannot be longer than 200 characters",
  }),
  description: z.string().optional(),
});

export type CreatePermissionDto = z.infer<typeof CreatePermissionSchema> & {
  projectId: string;
};

export const AssignPermissionToRoleSchema = z.object({
  permissionId: z.string({ required_error: "Permission ID is required" }),
  roleId: z.string({ required_error: "Role ID is required" }),
});

export type AssignPermissionToRoleDto = z.infer<
  typeof AssignPermissionToRoleSchema
>;
export type RemovePermissionFromRoleDto = AssignPermissionToRoleDto;

export const PermissionIdSchema = z.object({
  permissionId: z.string({ required_error: "Permission ID is required" }),
});
export type PermissionIdDo = z.infer<typeof PermissionIdSchema>;

export const UpdatePermissionSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export type UpdatePermissionDto = z.infer<typeof UpdatePermissionSchema> & {
  permissionId: string;
};
