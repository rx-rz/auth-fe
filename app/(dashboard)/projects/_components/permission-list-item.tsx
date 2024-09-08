import { Permission } from "@/schemas/rbac.schemas";
import { updatePermissionMutation } from "../mutations";
import { UpdatePermissionDialog } from "../_containers/update-permission-dialog";
import { DeletePermissionDialog } from "../_containers/delete-permission-dialog";

export const PermissionListItem = ({
  permission,
}: {
  permission: Permission;
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="mb-3 max-w-sm">
        <p className="text-lg font-bold">{permission.name}</p>
        <p className="text-sm font-medium">{permission.description}</p>
      </div>
      <div className="flex gap-2">
        <UpdatePermissionDialog permission={permission} />
        <DeletePermissionDialog permission={permission} />
      </div>
    </div>
  );
};
