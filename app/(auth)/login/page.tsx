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
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import { FormHeader } from "../components/form-header";
import { LoadingIcon } from "@/components/loading-icon";

const LoginPage = () => {
  const { loginAdminForm: form, loading, submitLoginAdminForm } = useLogin();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitLoginAdminForm)}>
        <FormHeader title="Log In" />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4 mt-6">
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
              <div className="flex items-end justify-end">
                <Link
                  href={ROUTES.FORGOT_PASSWORD}
                  className="text-xs underline underline-offset-1 font-bold"
                >
                  Forgot password?
                </Link>
              </div>
            </FormItem>
          )}
        />
        <Button className="w-full mt-10" type="submit">
          {loading ? <LoadingIcon /> : "Log In"}
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
