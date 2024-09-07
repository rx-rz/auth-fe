import { Separator } from "@/components/ui/separator";

type RolePermissions = {
  rolePermissions: {
    permission: {
      id: string;
      name: string;
      description: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
};

export const PermissionsList = ({ rolePermissions }: RolePermissions) => {
  return (
    <div className="w-full">
      <Separator className="my-3" />
      <p className="text-sm ">Permissions</p>
      <div className="mt-4">
        {rolePermissions.length > 0 ? (
          rolePermissions.map(({ permission }) => (
            <a>
              <p>{permission.name}</p>
            </a>
          ))
        ) : (
          <p>No roles yet. Please create and assign a permission to a role.</p>
        )}
      </div>
    </div>
  );
};

type Permission = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
};
export const PermissionsListItem = ({
  permission,
}: {
  permission: Permission;
}) => {
  return (
    <div>

    </div>
  );
};

export const CreateAndAssignPermissionDialog = () => {

}