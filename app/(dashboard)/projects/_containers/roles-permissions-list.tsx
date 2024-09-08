import { RemovePermissionFromRoleDialog } from "./remove-permission-from-role-dialog";

type Props = {
  rolePermissions: {
    permission: {
      id: string;
      name: string;
      description: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
  roleId: string;
};

export const RolePermissionsList = ({ rolePermissions, roleId }: Props) => {
  return (
    <div className="w-full border p-4">
      <div className="mt-4">
        {rolePermissions.length > 0 ? (
          rolePermissions.map(({ permission }) => (
            <div>
              <div key={permission.id} className="my-4">
                <p className=" font-bold">{permission.name}</p>
                <p className="text-sm">{permission.description}</p>
              </div>
              <RemovePermissionFromRoleDialog
                permissionId={permission.id}
                permissionName={permission.name}
                roleId={roleId}
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
