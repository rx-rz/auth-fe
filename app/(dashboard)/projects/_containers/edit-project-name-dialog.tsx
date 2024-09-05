import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updateProjectNameMutation } from "../../_core/swr";
import ConfirmationDialog from "@/components/confirmation-dialog";

export const EditProjectNameDialog = ({
  projectId,
  name,
}: {
  projectId: string;
  name: string;
}) => {
  const [open, setOpen] = useState(false);
  const { updateProjectName, loading } = updateProjectNameMutation();

  return (
    <ConfirmationDialog
      onConfirm={async () => await updateProjectName({ name, projectId })}
      title="Are you sure you want to update the name of this project to"
      trigger={
        <DialogTrigger className="bg-black items-center px-3 h-[2.8rem] justify-center flex">
          <Check stroke="white" />
        </DialogTrigger>
      }
      confirmButtonText="Yes, Update"
      isLoading={loading}

    />
  );

};
