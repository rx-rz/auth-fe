"use client";
import { useUpdateAdminDetails } from "../../_core/forms";
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
import { MoreHorizontal } from "lucide-react";

const UpdateDetailsPage = () => {
  const {
    updateAdminDetailsForm: form,
    loading,
    submitUpdateAdminDetailsForm,
  } = useUpdateAdminDetails();
  return (
    <div className="">
      <h1 className="text-2xl font-bold opacity-90">Update Details</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitUpdateAdminDetailsForm)}
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
            {loading ? (
              <MoreHorizontal size={20} className="animate-bounce" />
            ) : (
              <>Update Details</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateDetailsPage;
