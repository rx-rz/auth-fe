import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/loading-icon";
import { updatePermissionMutation } from "../mutations";
import { Permission } from "@/schemas/rbac.schemas";
import { Edit2Icon } from "lucide-react";

export const UpdatePermissionDialog = ({
  permission,
}: {
  permission: Permission;
}) => {
  const { form, loading, updatePermission } = updatePermissionMutation({
    permissionId: permission.id,
  });

  return (
    <div className="flex justify-between items-center font-satoshi">
      <Dialog>
        <DialogTrigger className="p-2 bg-black">
          <Edit2Icon stroke="white" />
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Update permission</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(updatePermission)}>
              <FormField
                control={form.control}
                name="name"
                defaultValue={permission.name}
                render={({ field }) => (
                  <FormItem className="mb-4 ">
                    <FormLabel>
                      Input the name for the new permission below:
                    </FormLabel>
                    <FormControl>
                      <Input className="" {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                defaultValue={permission.description ?? ""}
                render={({ field }) => (
                  <FormItem className="mb-4 ">
                    <FormLabel>
                      Enter a new description for the permission
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                {loading ? <LoadingIcon /> : "Update permission"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
