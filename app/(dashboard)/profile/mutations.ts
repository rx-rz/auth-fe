import { useShowToast } from "@/lib/hooks";
import * as FormTypes from "@/schemas/admin.schemas";
import { useUserStore } from "@/store/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  updateAdminDetails,
  updateAdminEmail,
  updateAdminPassword,
} from "./actions";
import { ROUTES } from "@/lib/routes";

export const useUpdateAdminEmail = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const { showToast } = useShowToast();

  const form = useForm<FormTypes.UpdateAdminEmailDto>({
    resolver: zodResolver(FormTypes.UpdateAdminEmailSchema),
    defaultValues: {
      currentEmail: user.email,
    },
  });

  const submitUpdateAdminEmailForm = async (
    values: FormTypes.UpdateAdminEmailDto
  ) => {
    setLoading(true);
    const { error, response } = await updateAdminEmail(values);
    if (response && response.success) {
      setUser({ ...user, email: values.newEmail });
      showToast({
        title: "Admin email updated successfully",
      });
      router.push(ROUTES.PROJECTS);
    }
    if (error) showToast({ error });
    setLoading(false);
  };

  return { loading, form, submitUpdateAdminEmailForm };
};

export const useUpdateAdminPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useShowToast();
  const { user } = useUserStore();
  const form = useForm<FormTypes.UpdateAdminPasswordDto>({
    resolver: zodResolver(FormTypes.UpdateAdminPasswordSchema),
    defaultValues: {
      currentPassword: "",
      email: user.email,
      newPassword: "",
    },
  });

  const submitUpdateAdminPasswordForm = async (
    values: FormTypes.UpdateAdminPasswordDto
  ) => {
    setLoading(true);
    const { error, response } = await updateAdminPassword(values);
    if (response && response.success) {
      showToast({
        title: "Admin password updated successfully",
      });
      router.push(ROUTES.PROJECTS);
    }
    if (error) {
      showToast({ error });
    }
    setLoading(false);
  };
  return { loading, form, submitUpdateAdminPasswordForm };
};

export const useUpdateAdminDetails = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const { showToast } = useShowToast();
  const form = useForm<FormTypes.UpdateAdminDto>({
    resolver: zodResolver(FormTypes.UpdateAdminSchema),
    defaultValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  const submitUpdateAdminDetailsForm = async (
    values: FormTypes.UpdateAdminDto
  ) => {
    setLoading(true);
    const { error, response } = await updateAdminDetails(values);
    if (response && response.success) {
      setUser({
        ...user,
        firstName: values.firstName ?? user.firstName,
        lastName: values.lastName ?? user.lastName,
      });
      showToast({
        title: "Admin details updated successfully",
      });
      router.push(ROUTES.PROJECTS);
    }
    if (error) {
      showToast({ error });
    }
    setLoading(false);
  };
  return { loading, form, submitUpdateAdminDetailsForm };
};
