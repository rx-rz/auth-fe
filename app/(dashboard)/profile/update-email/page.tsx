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
import { updateAdminEmailMutation } from "../mutations";

const UpdateEmailPage = () => {
  const { form, loading, updateAdminEmail } = updateAdminEmailMutation();
  return (
    <div className="">
      <h1 className="text-2xl font-bold opacity-90">Update Admin Email</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(updateAdminEmail)}
          className="max-w-[400px] w-[95%] mt-8"
        >
          <FormField
            control={form.control}
            name="currentEmail"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Current Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="adeleyetemiloluwa.work@gmail.com"
                    className=""
                    disabled
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
            name="newEmail"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>New Email</FormLabel>
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
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel> Password</FormLabel>
                <FormControl>
                  <Input className="" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-10" type="submit">
            {loading ? <LoadingIcon /> : <>Update Email</>}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateEmailPage;
