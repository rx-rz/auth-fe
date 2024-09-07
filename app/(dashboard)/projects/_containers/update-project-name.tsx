"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { Input } from "@/components/ui/input";
import { updateProjectNameMutation } from "../mutations";
type Props = {
  name: string;
  projectId: string;
};

export const UpdateProjectName = ({ name, projectId }: Props) => {
  const { form } = updateProjectNameMutation();

  return (
    <div className="w-full">
      <h3 className="font-bold mb-2">Project Details</h3>
      <Form {...form}>
        <form className="">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    {...field}
                    type="text"
                    defaultValue={name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <UpdateConfirmDialog
            name={form.getValues("name") ?? name}
            projectId={projectId ?? ""}
          />
        </form>
      </Form>
    </div>
  );
};

const UpdateConfirmDialog = ({ name, projectId }: Props) => {
  const { updateProjectName, loading } = updateProjectNameMutation();
  return (
    <ConfirmationDialog
      onConfirm={() => updateProjectName({ name, projectId })}
      title="Are you sure you want to update the name of this project to"
      itemName={name}
      trigger="Update"
      triggerClassName="bg-primary rounded-md text-white font-bold p-2 text-sm"
      confirmButtonText="Yes, Update"
      isLoading={loading}
    />
  );
};
