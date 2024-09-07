import { getProjectRolesQuery } from "../queries";
import { CreateRoleDialog } from "./create-role-dialog";
import { RoleListItem } from "../_components/role-list-item";

export const RoleList = ({ projectId }: { projectId: string }) => {
  const { roles } = getProjectRolesQuery({ projectId });
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold">Roles</h3>
        <CreateRoleDialog projectId={projectId} />
      </div>
      {roles?.map((role) => (
        <RoleListItem role={role} />
      ))}
    </div>
  );
};
