import { TrashIcon } from "lucide-react";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { deleteRoleMutation } from "../mutations";

export const DeleteRoleDialog = ({
  roleId,
  name,
}: {
  roleId: string;
  name: string;
}) => {
  const { loading, deleteRole } = deleteRoleMutation();
  return (
    <ConfirmationDialog
      onConfirm={() => deleteRole({ roleId })}
      title="Are you sure you want to delete "
      itemName={name}
      confirmButtonText="Yes, Delete"
      trigger={<TrashIcon stroke="white" />}
      cancelButtonText="No"
      isDestructive
      isLoading={loading}
    />
  );
};
