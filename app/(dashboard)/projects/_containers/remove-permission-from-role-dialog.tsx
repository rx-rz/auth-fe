import { TrashIcon } from "lucide-react";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { removePermissionFromRoleMutation } from "../mutations";
import { Permission } from "@/schemas/rbac.schemas";

export const RemovePermissionFromRoleDialog = ({
  permissionId,
  roleId,
  permissionName,
}: {
  permissionId: string;
  permissionName: string;
  roleId: string;
}) => {
  const { loading, removePermissionFromRole } =
    removePermissionFromRoleMutation();
  return (
    <ConfirmationDialog
      onConfirm={() => removePermissionFromRole({ permissionId, roleId })}
      title={`Are you sure you want to unnasign`}
      itemName={`'${permissionName}" permission`}
      confirmButtonText="Yes, Remove"
      trigger={<TrashIcon stroke="white" />}
      cancelButtonText="No"
      isDestructive
      isLoading={loading}
    />
  );
};
