"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdateProjectName } from "../forms";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProjectDetailsQuery } from "../queries";
import { useParams } from "next/navigation";

type Props = {
  name: string;
  projectId: string;
};

export const UpdateProjectName = () => {
  const { id } = useParams();
  const { project } = getProjectDetailsQuery({ id: (id as string) ?? "" });
  const { form } = useUpdateProjectName();

  return (
    <div>
      <Form {...form}>
        <form className="max-w-[400px] w-[95%] mt-8 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input
                    className=""
                    {...field}
                    type="text"
                    defaultValue={project?.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <UpdateConfirmDialog
            name={form.getValues("name")}
            projectId={(id as string) ?? ""}
          />
        </form>
      </Form>
    </div>
  );
};

const UpdateConfirmDialog = ({ name, projectId }: Props) => {
  const { submitUpdateProjectName, loading } = useUpdateProjectName();
  return (
    <ConfirmationDialog
      onConfirm={() => submitUpdateProjectName({ name, projectId })}
      title="Are you sure you want to update the name of this project to"
      itemName={name}
      trigger="Update"
      triggerClassName="bg-green-500 text-white font-bold p-2 text-sm"
      cancelButtonText="No"
      confirmButtonText="Yes, Update"
      isLoading={loading}
    />
  );
};
