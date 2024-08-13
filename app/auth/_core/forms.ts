import { startRegistration } from "@simplewebauthn/browser";
import {
  LoginAdminDto,
  LoginAdminSchema,
  RegisterAdminDto,
  RegisterAdminSchema,
} from "@/schemas/admin.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  getMfaRegistrationOptions,
  loginAdmin,
  registerAdmin,
  verifyMfaRegistrationOptions,
} from "./actions";
import { useRouter } from "next/navigation";
import { decodeUserToken, User } from "@/lib/utils";
import { useUserStore } from "@/store/user.store";
import { RegistrationResponseJSON } from "@simplewebauthn/types";
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
      if (user && user.mfaEnabled === false) {
        setUser(user);
        router.push("/auth/mfa");
      } else {
        router.push("/");
      }
    }
    console.log(error);
  }

  return { loginAdminForm, submitLoginAdminForm };
};

export const useMFA = () => {
  const { user } = useUserStore();
  async function triggerWebMFARegistration() {
    if (user) {
      const { response, error } = await getMfaRegistrationOptions(
        user.email ?? ""
      );
      if (error) throw Error("Error");
      if (response?.success) {
        const registrationResponse = await startRegistration(response.options);
        const a = await verifyMfaRegistrationOptions({
          email: user.email ?? "",
          options: registrationResponse,
          webAuthnUserId: response.options.user.id,
        });
      }
    }
  }
  return { triggerWebMFARegistration };
};
