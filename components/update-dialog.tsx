import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "./loading-icon";

interface UpdateDialogProps {
  triggerIcon?: React.ReactNode;
  triggerClassName?: string;
  title: string;
  itemName: string;
  onUpdate: () => void | Promise<void>;
  isLoading?: boolean;
  updateButtonText?: string;
  cancelButtonText?: string;
}

export const UpdateDialog: React.FC<UpdateDialogProps> = ({
  triggerIcon = <Check stroke="white" />,
  triggerClassName = "bg-black items-center px-3 h-[2.8rem] justify-center flex",
  title,
  itemName,
  onUpdate,
  isLoading = false,
  updateButtonText = "Yes, Update",
  cancelButtonText = "No",
}) => {
  const [open, setOpen] = useState(false);

  const handleUpdate = async () => {
    await onUpdate();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={triggerClassName}>{triggerIcon}</DialogTrigger>
      <DialogContent className="font-satoshi">
        <DialogHeader className="mb-6 mt-3 text-xl">
          <p>
            {title} <span className="font-bold inline">{itemName}</span>?
          </p>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="mr-3">{cancelButtonText}</DialogClose>
          <Button
            onClick={handleUpdate}
            className="text-lg"
            disabled={isLoading}
          >
            {isLoading ? <LoadingIcon /> : updateButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
