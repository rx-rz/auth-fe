import {
  LoginAdminDto,
  LoginAdminSchema,
  RegisterAdminDto,
  RegisterAdminSchema,
} from "@/schemas/admin.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getChallenge, loginAdmin, registerAdmin, sendWebAuthnCredentialsToServer } from "./actions";
import { useRouter } from "next/navigation";
import { client } from "@passwordless-id/webauthn";
import { decodeUserToken, User } from "@/lib/utils";
import { useUserStore } from "@/store/user.store";
import { VerifyChallengeDto } from "@/schemas/mfa.schemas";
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
        const { response } = await getChallenge();
        if (response?.success)
          sessionStorage.setItem("challenge", response.challenge);
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
      const registration = await client.register({
        user: user.id || "",
        challenge: sessionStorage.getItem("challenge") ?? "",
        timeout: 60,
      });

    }
  }
  return { triggerWebMFARegistration };
};
