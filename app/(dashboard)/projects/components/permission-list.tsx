import { createPermissionMutation, getRoleDetailsQuery } from "../../_core/swr";

export const PermissionList = ({ roleId }: { roleId: string }) => {
  const { createPermission, createPermissionIsLoading } =
    createPermissionMutation();
  const { data: roleDetails, isLoading: roleDetailsLoading } =
    getRoleDetailsQuery({ roleId });
  return (
    <div>
      <p></p>
    </div>
  );
};

const createPermissionDialog = () => {};
