"use client";
import { useResetPassword } from "../_core/forms";
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
import { Logo } from "@/components/ui/logo";
import { MoreHorizontal } from "lucide-react";

const ResetPasswordPage = () => {
  const {
    loading,
    submitResetUserPasswordForm,
    resetPasswordForm: form,
  } = useResetPassword();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitResetUserPasswordForm)}>
        <div className="mx-auto w-fit mb-10">
          <Logo />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl className="">
                <Input
                  placeholder="ade@gmail.com"
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
          name="newPassword"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>New Password</FormLabel>
              <FormControl className="">
                <Input
                  placeholder="6 characters minimum"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl className="">
                <Input
                  placeholder="6 characters minimum"
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-10" type="submit">
          {loading ? <MoreHorizontal size={30} /> : "Reset Password"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordPage;
