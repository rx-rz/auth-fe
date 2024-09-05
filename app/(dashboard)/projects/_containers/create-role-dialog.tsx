import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createRoleMutation } from "../../_core/swr";
import { MoreHorizontalIcon } from "lucide-react";

type Props = {
  projectId: string;
};

export const CreateRoleDialog = ({ projectId }: Props) => {
  const [roleName, setRoleName] = useState("");
  const { createRole, createRoleIsLoading } = createRoleMutation();
  return (
    <Dialog>
      <DialogTrigger className="bg-black px-3 py-2 text-white font-medium mt-4 rounded-md">
        Create Role
      </DialogTrigger>
      <DialogContent className="font-satoshi w-full max-w-[320px]">
        <DialogTitle className="mt-4">Create Role</DialogTitle>
        <DialogHeader className="mb-2">
          <p>Input the name of the new role below:</p>
        </DialogHeader>
        <DialogDescription>
          <Input
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
          <Button
            className="w-full mt-4"
            disabled={roleName.length < 1}
            onClick={() => {
              createRole({ name: roleName, projectId });
            }}
          >
            {createRoleIsLoading ? (
              <MoreHorizontalIcon size={30} className="animate-bounce" />
            ) : (
              "Create Role"
            )}
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
