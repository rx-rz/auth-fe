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
import { createPermissionMutation } from "../mutations";
type Props = {
  roleId: string;
};

export const CreatePermissionDialog = ({
  projectId,
}: {
  projectId: string;
}) => {
  const { form, loading, createPermission } = createPermissionMutation({
    projectId,
  });

  return (
    <div className="flex justify-between items-center font-satoshi">
      <Dialog>
        <DialogTrigger className="p-2 bg-black text-xs text-white rounded-md font-medium">
          Create Permission
        </DialogTrigger>
        <DialogContent className="font-satoshi">
          <DialogTitle>Create new permission</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(createPermission)}>
              <FormField
                control={form.control}
                name="name"
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
                render={({ field }) => (
                  <FormItem className="mb-4 ">
                    <FormLabel>
                      Enter a description for the permission to be created
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
