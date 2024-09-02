"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegister } from "../_core/forms";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { FormHeader } from "../components/form-header";
const RegisterPage = () => {
  const {
    registerAdminForm: form,
    submitRegisterAdminForm,
    loading,
  } = useRegister();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitRegisterAdminForm)}>
        <FormHeader title="Register" />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="mb-4 mt-8">
              <FormLabel>First Name</FormLabel>
              <FormControl className="">
                <Input placeholder="John" {...field} />
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
              <FormControl className="">
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Confirm Password</FormLabel>
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
          {loading ? (
            <MoreHorizontal size={20} className="animate-bounce" />
          ) : (
            "Register"
          )}
        </Button>
      </form>
      <p className="text-center mt-2 text-sm">
        Already registered? Please{" "}
        <Link href={ROUTES.LOGIN} className="underline underline-offset-2">
          login.
        </Link>
      </p>
    </Form>
  );
};

export default RegisterPage;
