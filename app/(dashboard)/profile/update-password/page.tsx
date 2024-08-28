"use client";
import { useUpdateAdminPassword } from "../../_core/forms";
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
import { useUserStore } from "@/store/user.store";
const UpdatePasswordPage = () => {
  const {
    updateAdminPasswordForm: form,
    loading,
    submitUpdateAdminPasswordForm,
  } = useUpdateAdminPassword();
  const { user } = useUserStore();
  return (
    <div className="">
      <h1 className="text-2xl font-bold opacity-90">Update Admin Password</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitUpdateAdminPasswordForm)}
          className="max-w-[400px] w-[95%] mt-8 "
        >
          <FormField
            control={form.control}
            name="email"
            defaultValue={user.email}
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
            name="currentPassword"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input className="" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input className="" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-10" type="submit">
            {loading ? (
              <MoreHorizontal size={20} className="animate-bounce" />
            ) : (
              <>Update Password</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdatePasswordPage;
