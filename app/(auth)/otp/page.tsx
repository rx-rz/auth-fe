"use client";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { getOTP, verifyAdminOTP } from "../_core/actions";
import { useUserStore } from "@/store/user.store";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { useToast } from "@/components/ui/use-toast";
import { FormHeader } from "../components/form-header";

const OTPPage = () => {
  const params = useSearchParams();
  const { user, setUser } = useUserStore();
  const { toast } = useToast();
  const [otp, setOTP] = useState("");
  const [getOTPButtonClicked, setGetOTPButtonClicked] = useState(false);
  const [otpError, setOTPError] = useState("");
  const router = useRouter();

  async function verifyOTP() {
    const resetEmail = params.get("reset-email") ?? "";
    const { error, response } = await verifyAdminOTP({
      code: otp,
      email: resetEmail ?? user.email ?? "",
    });
    if (response && response.success) {
      toast({
        title: "OTP verified successfully",
      });
      setUser({ ...user, isVerified: true });
      resetEmail
        ? router.push(ROUTES.RESET_PASSWORD)
        : router.push(ROUTES.PROJECTS);
    }
    if (error) {
      toast({
        variant: "destructive",
        title: error?.error,
      });
      setOTPError(error?.error);
    }
  }
  async function getOTPInEmail() {
    const resetEmail = params.get("reset-email") ?? "";
    const { error, response } = await getOTP({
      email: resetEmail ?? user.email ?? "",
      isAdmin: true,
    });
    if (response && response.success) {
      toast({
        title: `OTP sent to your email ${resetEmail ?? user.email ?? ""}`,
      });
    }
    if (error) {
      toast({
        variant: "destructive",
        title: error?.error,
      });
    }
  }

  return (
    <div className="">
      <FormHeader title="Input OTP" />
      <p className="font-medium opacity-70 mb-10 mt-1">
        Enter the OTP provided in your email
      </p>
      <InputOTP
        maxLength={6}
        className=""
        size={60}
        value={otp}
        onChange={(val) => setOTP(val)}
      >
        <InputOTPGroup className="flex gap-4">
          <InputOTPSlot
            index={0}
            className={`h-14 w-14 border-2 ${otpError ? "border-red-500" : ""}`}
          />
          <InputOTPSlot
            index={1}
            className={`h-14 w-14 border-2 ${otpError ? "border-red-500" : ""}`}
          />
          <InputOTPSlot
            index={2}
            className={`h-14 w-14 border-2 ${otpError ? "border-red-500" : ""}`}
          />
          <InputOTPSlot
            index={3}
            className={`h-14 w-14 border-2 ${otpError ? "border-red-500" : ""}`}
          />
          <InputOTPSlot
            index={4}
            className={`h-14 w-14 border-2 ${otpError ? "border-red-500" : ""}`}
          />
          <InputOTPSlot
            index={5}
            className={`h-14 w-14 border-2 ${otpError ? "border-red-500" : ""}`}
          />
        </InputOTPGroup>
      </InputOTP>
      {getOTPButtonClicked ? (
        <Button
          onClick={async () => {
            await verifyOTP();
          }}
          className="mt-6 w-full max-w-[200px]"
        >
          Verify OTP
        </Button>
      ) : (
        <Button
          onClick={async () => {
            await getOTPInEmail();
            setGetOTPButtonClicked(true);
          }}
          className="mt-6 w-full max-w-[200px]"
        >
          Get OTP
        </Button>
      )}
    </div>
  );
};

export default OTPPage;
