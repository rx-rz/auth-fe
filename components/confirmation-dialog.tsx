import React from "react";
import { Trash2Icon } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "./loading-icon";

type Props = {
  trigger: React.ReactNode | string;
  triggerClassName?: string;
  title: string;
  itemName?: string;
  onConfirm: () => any;
  isLoading?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

const ConfirmationDialog = ({
  trigger,
  triggerClassName = "bg-red-500 p-2",
  title,
  itemName,
  onConfirm,
  isLoading = false,
  confirmButtonText = "Yes",
  cancelButtonText = "No",
}: Props) => {
  const handleConfirmation = async () => {
    await onConfirm();
  };
  return (
    <Dialog>
      <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>
      <DialogContent className="font-satoshi">
        <DialogHeader className="mb-6 mt-3">
          <p>
            {title}
            {itemName && <span className="font-bold inline"> {itemName}</span>}?
          </p>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="mr-3 text-sm px-3">
            {cancelButtonText}
          </DialogClose>
          <Button variant="destructive" onClick={handleConfirmation}>
            {isLoading ? <LoadingIcon /> : confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
