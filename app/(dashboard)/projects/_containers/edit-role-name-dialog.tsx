import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Edit2Icon } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingIcon } from "@/components/loading-icon";
import { updateRoleNameMutation } from "../mutations";
export const EditRoleNameDialog = ({
  roleId,
  currentName,
}: {
  roleId: string;
  currentName: string;
}) => {
  const { loading, form, updateRoleName } = updateRoleNameMutation({
    roleId,
  });
  return (
    <Dialog>
      <DialogTrigger className="p-2 bg-black">
        <Edit2Icon stroke="white" />
      </DialogTrigger>
      <DialogContent className="font-satoshi w-full max-w-[320px]">
        <DialogTitle className="mt-4">Update Role Name</DialogTitle>
        <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(updateRoleName)}>
              <FormField
                control={form.control}
                name="name"
                defaultValue={currentName}
                render={({ field }) => (
                  <FormItem className="mb-4 ">
                    <FormLabel>
                      Input the name for the new role below:
                    </FormLabel>
                    <FormControl>
                      <Input className="" {...field} type="text" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                {loading ? <LoadingIcon /> : "Create role"}
              </Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
