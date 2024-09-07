import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import * as FormTypes from "@/schemas/admin.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  getMfaAuthenticationOptionsAction,
  getMfaRegistrationOptionsAction,
  loginAdminAction,
  registerAdminAction,
  resetAdminPasswordAction,
  verifyMfaAuthenticationOptionsAction,
  verifyMfaRegistrationOptionsAction,
} from "./actions";
import { useRouter } from "next/navigation";
import { decodeUserToken, User } from "@/lib/utils";
import { useUserStore } from "@/store/user.store";
import { useState } from "react";
import { ROUTES } from "@/lib/routes";
import { useShowToast } from "@/lib/hooks";

export const registerAdminMutation = () => {
  const router = useRouter();
  const { showToast } = useShowToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormTypes.RegisterAdminDto>({
    resolver: zodResolver(FormTypes.RegisterAdminSchema),
  });

  const registerAdmin = async (values: FormTypes.RegisterAdminDto) => {
    setLoading(true);
    const { error, response } = await registerAdminAction(values);
    if (response && response.success) {
      showToast({ title: "Admin registered successfully" });
      router.push(ROUTES.LOGIN);
    }
    if (error) {
      showToast({
        error,
      });
    }
    setLoading(false);
  };

  return { form, loading, registerAdmin };
};

export const loginAdminMutation = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserStore();
  const { showToast } = useShowToast();
  const form = useForm<FormTypes.LoginAdminDto>({
    resolver: zodResolver(FormTypes.LoginAdminSchema),
  });

  const loginAdmin = async (values: FormTypes.LoginAdminDto) => {
    setLoading(true);
    const { response, error } = await loginAdminAction(values);
    if (response && response.success) {
      const user: User | undefined = decodeUserToken(response.accessToken);
      if (user) {
        setUser(user);
        showToast({
          title: "Login successful",
        });
        router.push(ROUTES.MFA);
      }
    }
    if (error) {
      showToast({
        error,
      });
    }
    setLoading(false);
  };

  return { form, loading, loginAdmin };
};

export const webAuthnMutation = () => {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { showToast } = useShowToast();

  const triggerWebAuthnRegistration = async () => {
    setLoading(true);
    if (user) {
      const { response, error } = await getMfaRegistrationOptionsAction(
        user.email ?? ""
      );
      if (error) {
        showToast({
          error,
        });
      }
      if (response?.success) {
        const registrationResponse = await startRegistration(response.options);
        const { response: verificationResponse, error } =
          await verifyMfaRegistrationOptionsAction({
            email: user.email ?? "",
            options: registrationResponse,
            webAuthnUserId: response.options.user.id,
          });
        if (verificationResponse?.success) {
          showToast({
            title: "Passkey registration successful",
          });
          setUser({ ...user, mfaEnabled: true });
          router.push(ROUTES.PROJECTS);
        }
        if (error) {
          showToast({
            error,
          });
        }
      }
    }
    setLoading(false);
  };

  const triggerWebAuthnAuthentication = async () => {
    setLoading(true);
    if (user) {
      const { response, error } = await getMfaAuthenticationOptionsAction(
        user.email ?? ""
      );
      if (error) {
        if (error) {
          showToast({
            error,
          });
        }
      }
      if (response?.success) {
        const authenticationResponse = await startAuthentication(
          response.options
        );
        const { response: verificationResponse, error } =
          await verifyMfaAuthenticationOptionsAction({
            email: user.email ?? "",
            options: authenticationResponse,
          });
        if (verificationResponse?.success) {
          showToast({
            title: "Passkey verification successful",
          });
          router.push(ROUTES.PROJECTS);
        }
        if (error) {
          showToast({
            error,
          });
        }
      }
    }
    setLoading(false);
  };
  return {
    loading,
    triggerWebAuthnAuthentication,
    triggerWebAuthnRegistration,
  };
};

export const forgotPasswordMutation = () => {
  const form = useForm<FormTypes.AdminEmailDto>({
    resolver: zodResolver(FormTypes.AdminEmailSchema),
  });

  const handleForgotPasswordEmail = ({ email }: FormTypes.AdminEmailDto) => {
    sessionStorage.setItem("email-for-password-reset", email);
  };

  return { form, handleForgotPasswordEmail };
};

export const resetPasswordMutation = () => {
  const { showToast } = useShowToast();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormTypes.ResetAdminPasswordDto>({
    resolver: zodResolver(FormTypes.ResetAdminPasswordSchema),
  });

  const resetUserPassword = async (values: FormTypes.ResetAdminPasswordDto) => {
    setLoading(true);
    const { email, newPassword } = values;
    const { error, response } = await resetAdminPasswordAction({
      email,
      newPassword,
    });
    if (error) {
      showToast({
        error,
      });
    }
    if (response && response.success) {
      showToast({
        title: "Password reset successfully",
      });
      router.push(ROUTES.LOGIN);
    }
    setLoading(false);
  };

  return { loading, form, resetUserPassword };
};
