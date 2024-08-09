"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLogin } from "../_core/forms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const { loginAdminForm: form, submitLoginAdminForm } = useLogin();
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitLoginAdminForm)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl className="">
                  <Input placeholder="ade@gmail.com" {...field} type="email" />
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
                <FormLabel>Password</FormLabel>
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
            Log In
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default LoginPage;
