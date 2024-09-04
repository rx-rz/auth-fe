import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import * as FormTypes from "@/schemas/admin.schemas";
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
import { useState } from "react";
import { ROUTES } from "@/lib/routes";
import { useThrowToast } from "@/lib/hooks";

export const useRegister = () => {
  const router = useRouter();
  const { throwToast } = useThrowToast();
  const [loading, setLoading] = useState(false);
  const registerAdminForm = useForm<FormTypes.RegisterAdminDto>({
    resolver: zodResolver(FormTypes.RegisterAdminSchema),
  });

  const submitRegisterAdminForm = async (
    values: FormTypes.RegisterAdminDto
  ) => {
    setLoading(true);
    const { error, response } = await registerAdmin(values);
    if (response && response.success) {
      throwToast({ title: "Admin registered successfully" });
      router.push(ROUTES.LOGIN);
    }
    if (error) {
      throwToast({
        error,
      });
    }
    setLoading(false);
  };

  return { registerAdminForm, loading, submitRegisterAdminForm };
};

export const useLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserStore();
  const { throwToast } = useThrowToast();
  const loginAdminForm = useForm<FormTypes.LoginAdminDto>({
    resolver: zodResolver(FormTypes.LoginAdminSchema),
  });

  const submitLoginAdminForm = async (values: FormTypes.LoginAdminDto) => {
    setLoading(true);
    const { response, error } = await loginAdmin(values);
    if (response && response.success) {
      const user: User | undefined = decodeUserToken(response.accessToken);
      if (user) {
        setUser(user);
        throwToast({
          title: "Login successful",
        });
        router.push(ROUTES.MFA);
      }
    }
    if (error) {
      throwToast({
        error,
      });
    }
    setLoading(false);
  };

  return { loginAdminForm, loading, submitLoginAdminForm };
};

export const useMFA = () => {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { throwToast } = useThrowToast();

  const triggerWebMFARegistration = async () => {
    setLoading(true);
    if (user) {
      const { response, error } = await getMfaRegistrationOptions(
        user.email ?? ""
      );
      if (error) {
        throwToast({
          error,
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
          throwToast({
            title: "Passkey registration successful",
          });
          setUser({ ...user, mfaEnabled: true });
          router.push(ROUTES.PROJECTS);
        }
        if (error) {
          throwToast({
            error,
          });
        }
      }
    }
    setLoading(false);
  };

  const triggerWebMFAAuthentication = async () => {
    setLoading(true);
    if (user) {
      const { response, error } = await getMfaAuthenticationOptions(
        user.email ?? ""
      );
      if (error) {
        if (error) {
          throwToast({
            error,
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
          throwToast({
            title: "Passkey verification successful",
          });
          router.push(ROUTES.PROJECTS);
        }
        if (error) {
          throwToast({
            error,
          });
        }
      }
    }
    setLoading(false);
  };
  return { loading, triggerWebMFARegistration, triggerWebMFAAuthentication };
};

export const useForgotPassword = () => {
  const forgotPasswordForm = useForm<FormTypes.AdminEmailDto>({
    resolver: zodResolver(FormTypes.AdminEmailSchema),
  });

  const submitForgotPasswordForm = ({ email }: FormTypes.AdminEmailDto) => {
    sessionStorage.setItem("email-for-password-reset", email);
  };

  return { forgotPasswordForm, submitForgotPasswordForm };
};

export const useResetPassword = () => {
  const { throwToast } = useThrowToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetPasswordForm = useForm<FormTypes.ResetAdminPasswordDto>({
    resolver: zodResolver(FormTypes.ResetAdminPasswordSchema),
  });

  const submitResetUserPasswordForm = async (
    values: FormTypes.ResetAdminPasswordDto
  ) => {
    setLoading(true);
    const { email, newPassword } = values;
    const { error, response } = await resetAdminPassword({
      email,
      newPassword,
    });
    if (error) {
      throwToast({
        error,
      });
    }
    if (response && response.success) {
      throwToast({
        title: "Password reset successfully",
      });
      router.push(ROUTES.LOGIN);
    }
    setLoading(false);
  };

  return { loading, resetPasswordForm, submitResetUserPasswordForm };
};
