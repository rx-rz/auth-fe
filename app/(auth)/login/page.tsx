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
import { ROUTES } from "@/lib/routes";
import Link from "next/link";

const LoginPage = () => {
  const { loginAdminForm: form, loading, submitLoginAdminForm } = useLogin();
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
      <p className="text-center mt-2 text-sm">
        Don't have an account? Please{" "}
        <Link href={ROUTES.REGISTER} className="underline underline-offset-2">
          register.
        </Link>
      </p>
    </Form>
  );
};
export default LoginPage;
