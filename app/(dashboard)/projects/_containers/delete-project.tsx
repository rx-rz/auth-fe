import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useDeleteProject } from "../mutations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoadingIcon } from "@/components/loading-icon";
import { DialogTitle } from "@radix-ui/react-dialog";
type Props = {
  projectId: string;
  name: string;
};
export const DeleteProject = ({ projectId, name }: Props) => {
  const { form, loading, submitDeleteProjectForm } = useDeleteProject({
    projectId,
  });
  return (
    <Dialog>
      <DialogTrigger className="bg-red-500 items-center px-3 text-white font-bold text-sm py-2 justify-center flex">
        Delete project
      </DialogTrigger>
      <DialogContent className="font-satoshi w-full max-w-[320px]">
        <DialogTitle className="mb-2 mt-8">
          <h3 className="text-center text-xl font-bold">
            Are you sure you want to delete this project?
          </h3>
        </DialogTitle>
        <DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitDeleteProjectForm)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-4 text-center ">
                    <FormLabel className="text-center">
                      If you want to delete this project, type{" "}
                      <span className="text-red-500 font-bold">{name}</span> in
                      the input box below:
                    </FormLabel>
                    <FormControl>
                      <Input className="" {...field} type="text" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                variant={"destructive"}
                className="w-full"
                type="submit"
                disabled={form.getValues("name") !== name}
              >
                {loading ? <LoadingIcon /> : "Delete project"}
              </Button>
            </form>
          </Form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
