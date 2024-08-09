import {
  LoginAdminDto,
  LoginAdminSchema,
  RegisterAdminDto,
  RegisterAdminSchema,
} from "@/schemas/admin.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerAdmin } from "./actions";

export const useRegister = () => {
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
  }

  return { registerAdminForm, submitRegisterAdminForm };
};

export const useLogin = () => {
  const loginAdminForm = useForm<LoginAdminDto>({
    resolver: zodResolver(LoginAdminSchema),
  });

  function submitLoginAdminForm(values: LoginAdminDto) {
    console.log(values);
  }

  return { loginAdminForm, submitLoginAdminForm };
};
