import { PermissionListItem } from "../_components/permission-list-item";
import { getProjectPermissionsQuery } from "../queries";
import { CreatePermissionDialog } from "./create-permission-dialog";

export const PermissionsList = ({ projectId }: { projectId: string }) => {
  const { permissions, permissionsAreLoading } = getProjectPermissionsQuery({
    projectId,
  });
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold">Permissions</h3>
        <CreatePermissionDialog projectId={projectId} />
      </div>
      {permissions?.map((permission) => (
        <PermissionListItem permission={permission} />
      ))}
    </div>
  );
};
