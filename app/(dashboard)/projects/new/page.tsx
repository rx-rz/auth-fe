"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProjectApiKey } from "../_containers/project-api-key";
import { LoadingIcon } from "@/components/loading-icon";
import { useCreateNewProject } from "../forms";

const NewProjectPage = () => {
  const { loading, success, keys, form, submitCreateNewProjectForm } =
    useCreateNewProject();

  return (
    <div className="justify-evenly mt-10 max-w-[80%] mx-auto">
      <div className="flex justify-between ">
        <div className="">
          <h1 className="text-4xl max-w-xl font-bold opacity-90">
            Let's manage auth for a new project!
          </h1>
          <p className="text-lg mt-2 max-w-xl">
            Get ready to unlock the power of secure user access! Here's where
            you'll craft the perfect authentication system for your project.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitCreateNewProjectForm)}
            className="flex-1 max-w-xl"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="text-base font-bold">
                    Project Name
                  </FormLabel>
                  <FormControl className="">
                    <Input className="" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              {loading ? <LoadingIcon /> : "Create New Project"}
            </Button>
          </form>
        </Form>
      </div>

      {success ? (
        <ProjectApiKey apiKey={keys.apiKey} clientKey={keys.clientKey} />
      ) : (
        <> </>
      )}
    </div>
  );
};

export default NewProjectPage;
