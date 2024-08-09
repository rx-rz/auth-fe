import {
  LoginAdminDto,
  LoginAdminSchema,
  RegisterAdminDto,
  RegisterAdminSchema,
} from "@/schemas/admin.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginAdmin, registerAdmin } from "./actions";
import { useRouter } from "next/navigation";

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
  const loginAdminForm = useForm<LoginAdminDto>({
    resolver: zodResolver(LoginAdminSchema),
  });

  async function submitLoginAdminForm(values: LoginAdminDto) {
    const { response, error } = await loginAdmin(values);
    console.log({ response });
    if (response && response.success) {
      router.push("/");
    }
  }

  return { loginAdminForm, submitLoginAdminForm };
};
