import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, MoreHorizontal, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { deleteProjectMutation } from "../../_core/swr";

export const DeleteProjectDialog = ({
  name,
  projectId,
}: {
  name: string;
  projectId: string;
}) => {
  const [inputtedName, setInputtedName] = useState("");
  const { deleteProject, loading } = deleteProjectMutation();
  return (
    <Dialog>
      <DialogTrigger className="bg-red-500 items-center px-3 h-[2.8rem] justify-center flex">
        <Trash2Icon stroke="white" />
      </DialogTrigger>
      <DialogContent className="font-satoshi w-full max-w-[320px]">
        <DialogHeader className="mb-2 mt-8">
          <h3 className="text-center text-xl font-bold">
            Are you sure you want to delete this project?
          </h3>
          <p className="  text-center mt-3">
            If you want to delete this project, type{" "}
            <span className="text-red-500 font-bold">{name}</span> in the input
            box below:
          </p>
        </DialogHeader>
        <DialogDescription>
          <Input
            value={inputtedName}
            variant={"default"}
            onChange={(e) => setInputtedName(e.target.value)}
          />
          <Button
            variant={"destructive"}
            className="w-full mt-4"
            onClick={() => {
              deleteProject({ projectId });
            }}
            disabled={name !== inputtedName}
          >
            {loading ? (
              <MoreHorizontal size={30} className="animate-bounce" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
