import { Separator } from "@/components/ui/separator";
import { getProjectPermissionsQuery } from "../queries";
import { useParams } from "next/navigation";
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

export const PermissionsList = ({ rolePermissions }: Props) => {
  return (
    <div className="w-full">
      <div className="mt-4">
        {rolePermissions.length > 0 ? (
          rolePermissions.map(({ permission }) => (
            <a key={permission.id}>
              <p>{permission.name}</p>
            </a>
          ))
        ) : (
          <></>
        )}
      </div>
      {/* <PermissionSelector /> */}
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
  return <div></div>;
};
