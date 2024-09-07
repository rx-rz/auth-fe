import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingIcon } from "@/components/loading-icon";
import { createRoleMutation } from "../mutations";

type Props = {
  projectId: string;
};

export const CreateRoleDialog = ({ projectId }: Props) => {
  const { form, loading, createRole } = createRoleMutation({ projectId });
  return (
    <Dialog>
      <DialogTrigger className="bg-black px-3 py-2 text-white font-medium mt-4 rounded-md">
        Create Role
      </DialogTrigger>
      <DialogContent className="font-satoshi w-full max-w-[320px]">
        <DialogTitle className="mt-4">Create Role</DialogTitle>

        <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(createRole)}>
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
