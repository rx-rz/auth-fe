import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import {
  LoginAdminDto,
  LoginAdminSchema,
  RegisterAdminDto,
  RegisterAdminSchema,
} from "@/schemas/admin.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  getMfaAuthenticationOptions,
  getMfaRegistrationOptions,
  loginAdmin,
  registerAdmin,
  verifyMfaAuthenticationOptions,
  verifyMfaRegistrationOptions,
} from "./actions";
import { useRouter } from "next/navigation";
import { decodeUserToken, User } from "@/lib/utils";
import { useUserStore } from "@/store/user.store";
import { Axios, AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
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
        title: "Success",
        description: "Admin registered successfully",
      });
      router.push(ROUTES.LOGIN);
    }
    if (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          title: error.response?.data.message.error,
          description: error.response?.data.message.message,
        });
      }
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
        router.push(ROUTES.MFA);
      }
    }
    if (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          title: error.response?.data.message.error,
          description: error.response?.data.message.message,
        });
      }
    }
    setLoading(false);
  }

  return { loginAdminForm, submitLoginAdminForm };
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
        if (error instanceof AxiosError) {
          toast({
            variant: "destructive",
            title: error.response?.data.message.error,
            description: error.response?.data.message.message,
          });
        }
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
          setUser({ ...user, mfaEnabled: true });
          router.push("/");
        }
        if (error) {
          if (error instanceof AxiosError) {
            toast({
              variant: "destructive",
              title: error.response?.data.message.error,
              description: error.response?.data.message.message,
            });
          }
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
          if (error instanceof AxiosError) {
            toast({
              variant: "destructive",
              title: error.response?.data.message.error,
              description: error.response?.data.message.message,
            });
          }
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
          router.push("/");
        }
        if (error) {
          if (error) {
            if (error instanceof AxiosError) {
              toast({
                variant: "destructive",
                title: error.response?.data.message.error,
                description: error.response?.data.message.message,
              });
            }
          }
        }
      }
    }
    setLoading(false);
  }
  return { loading, triggerWebMFARegistration, triggerWebMFAAuthentication };
};
////
