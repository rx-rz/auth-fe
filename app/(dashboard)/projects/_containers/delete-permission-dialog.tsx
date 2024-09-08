import { TrashIcon } from "lucide-react";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { deletePermissionMutation, deleteRoleMutation } from "../mutations";
import { Permission } from "@/schemas/rbac.schemas";

export const DeletePermissionDialog = ({
  permission,
}: {
  permission: Permission;
}) => {
  const { loading, deletePermission } = deletePermissionMutation();
  return (
    <ConfirmationDialog
      onConfirm={() => deletePermission({ permissionId: permission.id })}
      title="Are you sure you want to delete the"
      itemName={`'${permission.name}" permission`}
      confirmButtonText="Yes, Delete"
      trigger={<TrashIcon stroke="white" />}
      cancelButtonText="No"
      isDestructive
      isLoading={loading}
    />
  );
};
