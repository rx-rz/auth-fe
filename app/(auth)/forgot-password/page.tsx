"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/lib/routes";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormHeader } from "../components/form-header";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <>
      <FormHeader title="Forgot Password" />
      <div className="mt-6">
        <Label className="text-sm opacity-90 font-medium">Email</Label>
        <Input
          className="mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
      </div>
      <Button
        onClick={() => {
          // Let's the OTP page know we're sending OTPs for resetting the password this time
          router.push(`${ROUTES.OTP_PAGE}?reset-email=${email}`);
        }}
        className="w-full mt-10"
      >
        Proceed with email
      </Button>
    </>
  );
};

export default ForgotPasswordPage;
