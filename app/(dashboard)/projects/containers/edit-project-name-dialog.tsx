import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, MoreHorizontal } from "lucide-react";
import { updateProjectName } from "../../_core/swr";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const EditProjectNameDialog = ({
  projectId,
  name,
}: {
  projectId: string;
  name: string;
}) => {
  const [open, setOpen] = useState(false);
  const { updateName, loading } = updateProjectName();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-black items-center px-3 h-[2.8rem] justify-center flex">
        <Check stroke="white" />
      </DialogTrigger>
      <DialogContent className="font-satoshi">
        <DialogHeader className="mb-6 mt-3 text-xl">
          <p>
            Are you sure you want to update the name of this project to{" "}
            <span className="font-bold inline">{name}</span>?
          </p>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="mr-3">No</DialogClose>
          <Button
            onClick={() => {
              updateName({
                name,
                projectId,
              });
            }}
            className="text-lg"
          >
            {loading ? (
              <MoreHorizontal className="animate-bounce" size={30} />
            ) : (
              "Yes, Update"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
