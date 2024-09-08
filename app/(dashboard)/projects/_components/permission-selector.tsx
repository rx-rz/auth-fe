import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "next/navigation";
import { getProjectPermissionsQuery } from "../queries";
import { Dispatch, SetStateAction } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  setPermissionId: Dispatch<SetStateAction<string>>;
};
export const PermissionSelector = ({ setPermissionId }: Props) => {
  const { id } = useParams();
  const { permissions } = getProjectPermissionsQuery({
    projectId: id as string,
  });

  return (
    <Select
      onValueChange={(value) => {
        setPermissionId(value);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a permission" />
      </SelectTrigger>
      {permissions ? (
        <SelectContent className="max-w-[270px]">
          <SelectGroup>
            <SelectLabel className="font-satoshi">
              Available Permissions
            </SelectLabel>
            {permissions?.map((permission) => (
              <SelectItem value={permission.id} className="font-satoshi">
                <h2 className="font-bold">{permission.name}</h2>
                <p className="font-medium text-sm opacity-80">
                  {permission.description}
                </p>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      ) : (
        <></>
      )}
    </Select>
  );
};
