import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PermissionsList } from "../_containers/permissions-list";
import { EditRoleNameDialog } from "../_containers/edit-role-name-dialog";
import { DeleteRoleDialog } from "../_containers/delete-role-dialog";

type Role = {
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
      updatedAt: Date;
    };
  }[];
};

export const RoleListItem = ({ role }: { role: Role }) => {
  const [showPermissions, setShowPermissions] = useState(false);
  return (
    <div className="mb-4">
      <div className="flex gap-4 justify-between items-center" key={role.id}>
        <div>
          <p className="text-lg font-bold opacity-90">{role.name}</p>
          <Button
            className="text-sm p-0 bg-transparent text-black hover:bg-transparent"
            onClick={() => setShowPermissions(!showPermissions)}
          >
            View Permissions
          </Button>
        </div>
        <div className="flex gap-2">
          <EditRoleNameDialog currentName={role.name} roleId={role.id} />
          <DeleteRoleDialog name={role.name} roleId={role.id} />
        </div>
      </div>
      {showPermissions ? (
        <PermissionsList rolePermissions={role.rolePermissions} />
      ) : (
        <></>
      )}
    </div>
  );
};
