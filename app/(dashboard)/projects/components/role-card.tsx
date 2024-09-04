import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Check,
  Edit2,
  MoreHorizontal,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { deleteRoleMutation, updateRoleNameMutation } from "../../_core/swr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";

type Role = {
  role: {
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
};
export const RoleCard = ({ role }: Role) => {
  return (
    <Card
      className="p-4 text-xl rounded-none border-black group h-44"
      key={role.id}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-2xl opacity-90">{role.name}</h3>
          <p>{new Date(role.createdAt).toDateString()}</p>
        </div>
        <div className="flex gap-2">
          <EditRoleNameDialog currentName={role.name} roleId={role.id} />
          <DeleteRoleDialog name={role.name} roleId={role.id} />
        </div>
      </div>
      <Button className="text-left w-full  bottom-0 mt-10" variant={"outline"}>
        View Permissions
      </Button>
    </Card>
  );
};

const DeleteRoleDialog = ({
  roleId,
  name,
}: {
  roleId: string;
  name: string;
}) => {
  const { deleteRole, deleteRoleIsLoading } = deleteRoleMutation({ roleId });
  return (
    <Dialog>
      <DialogTrigger className="bg-red-500 p-2">
        <Trash2Icon stroke="white" />
      </DialogTrigger>
      <DialogContent className="font-satoshi">
        <DialogHeader className="mb-6 mt-3">
          <p>
            Are you sure you want to delete this role:
            <span className="font-bold inline">{name}</span>?
          </p>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="mr-3 text-sm px-3">No</DialogClose>
          <Button
            variant={"destructive"}
            onClick={() => {
              deleteRole();
            }}
          >
            {deleteRoleIsLoading ? (
              <MoreHorizontal className="animate-bounce" size={30} />
            ) : (
              "Yes, Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const EditRoleNameDialog = ({
  roleId,
  currentName,
}: {
  roleId: string;
  currentName: string;
}) => {
  const { updateRoleName, updateRoleNameIsLoading } = updateRoleNameMutation();
  const [newRoleName, setNewRoleName] = useState(currentName);
  return (
    <Dialog>
      <DialogTrigger className="p-2 bg-black">
        <Edit2 stroke="white" />
      </DialogTrigger>
      <DialogContent className="font-satoshi w-full max-w-[320px]">
        <DialogTitle className="mt-4">Update Role Name</DialogTitle>
        <DialogHeader className="mb-2">
          <p>Input the new name for the role below:</p>
        </DialogHeader>
        <DialogDescription>
          <Input
            value={newRoleName}
            onChange={(e) => setNewRoleName(e.target.value)}
          />
          <Button
            className="w-full mt-4"
            disabled={newRoleName.length < 1}
            onClick={() => {
              updateRoleName({ name: newRoleName, roleId });
            }}
          >
            {updateRoleNameIsLoading ? (
              <MoreHorizontalIcon size={30} className="animate-bounce" />
            ) : (
              "Update"
            )}
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

