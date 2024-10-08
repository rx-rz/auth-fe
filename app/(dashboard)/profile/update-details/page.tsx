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
import { LoadingIcon } from "@/components/loading-icon";
import { updateAdminDetailsMutation } from "../mutations";

const UpdateDetailsPage = () => {
  const { form, loading, updateAdminDetails } = updateAdminDetailsMutation();
  return (
    <div className="">
      <h1 className="text-2xl font-bold opacity-90">Update Details</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(updateAdminDetails)}
          className="max-w-[400px] w-[95%] mt-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4 hidden">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="adeleyetemiloluwa.work@gmail.com"
                    className=""
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input className="" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input className="" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full mt-10" type="submit">
            {loading ? <LoadingIcon /> : <>Update Details</>}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateDetailsPage;
