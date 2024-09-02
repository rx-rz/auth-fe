import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import {
  LoginAdminDto,
  LoginAdminSchema,
  RegisterAdminDto,
  RegisterAdminSchema,
  ResetAdminPasswordDto,
} from "@/schemas/admin.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  getMfaAuthenticationOptions,
  getMfaRegistrationOptions,
  loginAdmin,
  registerAdmin,
  resetAdminPassword,
  verifyMfaAuthenticationOptions,
  verifyMfaRegistrationOptions,
} from "./actions";
import { useRouter } from "next/navigation";
import { decodeUserToken, User } from "@/lib/utils";
import { useUserStore } from "@/store/user.store";
import { toast, useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ROUTES } from "@/lib/routes";

export const useRegister = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const registerAdminForm = useForm<RegisterAdminDto>({
    resolver: zodResolver(RegisterAdminSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  async function submitRegisterAdminForm(values: RegisterAdminDto) {
    setLoading(true);
    const { error, response } = await registerAdmin(values);
    if (response && response.success) {
      toast({
        title: "Admin registered successfully",
      });
      router.push(ROUTES.LOGIN);
    }
    if (error) {
      toast({
        variant: "destructive",
        title: error?.error,
      });
    }
    setLoading(false);
  }

  return { registerAdminForm, loading, submitRegisterAdminForm };
};

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserStore();
  const { toast } = useToast();
  const loginAdminForm = useForm<LoginAdminDto>({
    resolver: zodResolver(LoginAdminSchema),
  });

  async function submitLoginAdminForm(values: LoginAdminDto) {
    setLoading(true);
    const { response, error } = await loginAdmin(values);
    if (response && response.success) {
      const user: User | undefined = decodeUserToken(response.accessToken);
      if (user) {
        setUser(user);
        toast({
          title: "Login successful",
        });
        router.push(ROUTES.MFA);
      }
    }
    if (error) {
      toast({
        variant: "destructive",
        title: error?.error,
      });
    }
    setLoading(false);
  }

  return { loginAdminForm, loading, submitLoginAdminForm };
};

export const useMFA = () => {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  async function triggerWebMFARegistration() {
    setLoading(true);
    if (user) {
      const { response, error } = await getMfaRegistrationOptions(
        user.email ?? ""
      );
      if (error) {
        toast({
          variant: "destructive",
          title: error?.error,
        });
      }
      if (response?.success) {
        const registrationResponse = await startRegistration(response.options);
        const { response: verificationResponse, error } =
          await verifyMfaRegistrationOptions({
            email: user.email ?? "",
            options: registrationResponse,
            webAuthnUserId: response.options.user.id,
          });
        if (verificationResponse?.success) {
          toast({
            title: "Passkey registration successful",
          });
          setUser({ ...user, mfaEnabled: true });
          router.push(ROUTES.PROJECTS);
        }
        if (error) {
          toast({
            variant: "destructive",
            title: error?.error,
          });
        }
      }
    }
    setLoading(false);
  }

  async function triggerWebMFAAuthentication() {
    setLoading(true);
    if (user) {
      const { response, error } = await getMfaAuthenticationOptions(
        user.email ?? ""
      );
      if (error) {
        if (error) {
          toast({
            variant: "destructive",
            title: error?.error,
          });
        }
      }
      if (response?.success) {
        const authenticationResponse = await startAuthentication(
          response.options
        );
        const { response: verificationResponse, error } =
          await verifyMfaAuthenticationOptions({
            email: user.email ?? "",
            options: authenticationResponse,
          });
        if (verificationResponse?.success) {
          toast({
            title: "Passkey verification successful",
          });
          router.push(ROUTES.PROJECTS);
        }
        if (error) {
          toast({
            variant: "destructive",
            title: error?.error,
          });
        }
      }
    }
    setLoading(false);
  }
  return { loading, triggerWebMFARegistration, triggerWebMFAAuthentication };
};
////

export const useResetPassword = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetPasswordForm = useForm<ResetAdminPasswordDto>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      newPassword: "",
    },
  });

  async function submitResetUserPasswordForm(values: ResetAdminPasswordDto) {
    setLoading(true);
    const { email, newPassword } = values;
    const { error, response } = await resetAdminPassword({
      email,
      newPassword,
    });
    if (error) {
      toast({
        title: error?.error,
        variant: "destructive",
      });
    }
    if (response && response.success) {
      toast({
        title: "Password reset successfully",
      });
      router.push(ROUTES.LOGIN);
    }
    setLoading(false);
  }

  return { loading, resetPasswordForm, submitResetUserPasswordForm };
};
