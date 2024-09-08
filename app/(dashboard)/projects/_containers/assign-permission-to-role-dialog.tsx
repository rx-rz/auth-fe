import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { assignPermissionToRoleMutation } from "../mutations";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/loading-icon";
import { useState } from "react";
import { PermissionSelector } from "../_components/permission-selector";

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
export const AssignPermissionToRoleDialog = ({
  roleId,
  rolePermissions,
}: Props) => {
  const { assignPermissionToRole, loading } = assignPermissionToRoleMutation({
    roleId,
  });
  const [permissionId, setPermissionId] = useState("");
  const rolePermissionAlreadyAssignedToThisRole = rolePermissions.find(
    ({ permission }) => permission.id === permissionId
  );
  return (
    <Dialog>
      <DialogTrigger className="bg-black items-center px-3 text-white font-medium rounded-md text-xs justify-center flex">
        Assign permission
      </DialogTrigger>
      <DialogContent className="font-satoshi w-full max-w-[320px]">
        <DialogTitle className="mb-2">
          <h3 className="text-center text-xl font-bold">
            Please select an available permission
          </h3>
        </DialogTitle>
        <PermissionSelector setPermissionId={setPermissionId} />
        <DialogDescription>
          <Button
            className="w-full"
            type="submit"
            onClick={async () => {
              await assignPermissionToRole({ permissionId });
            }}
            disabled={
              permissionId.length === 0 ??
              rolePermissionAlreadyAssignedToThisRole
            }
          >
            {loading ? <LoadingIcon /> : "Select permission"}
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
