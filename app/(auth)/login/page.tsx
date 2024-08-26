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
import { Logo } from "@/components/ui/logo";

const LoginPage = () => {
  const { loginAdminForm: form, submitLoginAdminForm } = useLogin();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitLoginAdminForm)}
        className="mx-auto mt-24 w-[90%] max-w-[400px] font-satoshi"
      >
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
  );
};
export default LoginPage;
