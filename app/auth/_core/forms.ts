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
export const useRegister = () => {
  const router = useRouter();
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
    const { response, error } = await registerAdmin(values);
    if (response && response.success) {
      router.push("/");
    }
  }
  return { registerAdminForm, submitRegisterAdminForm };
};

export const useLogin = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
  const loginAdminForm = useForm<LoginAdminDto>({
    resolver: zodResolver(LoginAdminSchema),
  });

  async function submitLoginAdminForm(values: LoginAdminDto) {
    const { response, error } = await loginAdmin(values);
    if (response && response.success) {
      const user: User | undefined = decodeUserToken(response.accessToken);
      if (user) {
        setUser(user);
        router.push("/auth/mfa");
      }
    }
    console.log(error);
  }

  return { loginAdminForm, submitLoginAdminForm };
};

export const useMFA = () => {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  async function triggerWebMFARegistration() {
    if (user) {
      const { response, error } = await getMfaRegistrationOptions(
        user.email ?? ""
      );
      if (error) throw Error("Error");
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
      }
    }
  }

  async function triggerWebMFAAuthentication() {
    if (user) {
      const { response, error } = await getMfaAuthenticationOptions(
        user.email ?? ""
      );
      if (error) throw Error("Error");
      if (response?.success) {
        const authenticationResponse = await startAuthentication(
          response.options
        );
        const { response: verificationResponse } =
          await verifyMfaAuthenticationOptions({
            email: user.email ?? "",
            options: authenticationResponse,
          });
        if (verificationResponse?.success) {
          router.push("/");
        }
      }
    }
  }
  return { triggerWebMFARegistration, triggerWebMFAAuthentication };
};
////
