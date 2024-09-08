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
import { createAndAssignPermissionToRoleMutation } from "../mutations";
type Props = {
  roleId: string;
};

export const CreatePermissionDialog = ({ roleId }: Props) => {
  const { form, loading, createPermission } =
    createAndAssignPermissionToRoleMutation({ roleId });

  return (
    <div className="flex justify-between items-center mb-6 font-satoshi">
      <Dialog>
        <DialogTrigger className="p-2 bg-black text-xs text-white rounded-md font-medium">
          Create Permission
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Create new permission</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(createPermission)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-4 ">
                    <FormLabel>
                      Input the name for the new role below:
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
                render={({ field }) => (
                  <FormItem className="mb-4 ">
                    <FormLabel>
                      Input the name for the new role below:
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                {loading ? <LoadingIcon /> : "Create permission"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
