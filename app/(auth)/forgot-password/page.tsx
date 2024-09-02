"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/lib/routes";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <div className="max-w-[400px] mx-auto">
      <div>
        <Label>Email</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
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
    </div>
  );
};

export default ForgotPasswordPage;
