import { useShowToast } from "@/lib/hooks";
import * as FormTypes from "@/schemas/admin.schemas";
import { useUserStore } from "@/store/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  updateAdminDetailsAction,
  updateAdminEmailAction,
  updateAdminPasswordAction,
} from "./actions";
import { ROUTES } from "@/lib/routes";

export const updateAdminEmailMutation = () => {
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

  const updateAdminEmail = async (values: FormTypes.UpdateAdminEmailDto) => {
    setLoading(true);
    const { error, response } = await updateAdminEmailAction(values);
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

  return { loading, form, updateAdminEmail };
};

export const updateAdminPasswordMutation = () => {
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

  const updateAdminPassword = async (
    values: FormTypes.UpdateAdminPasswordDto
  ) => {
    setLoading(true);
    const { error, response } = await updateAdminPasswordAction(values);
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
  return { loading, form, updateAdminPassword };
};

export const updateAdminDetailsMutation = () => {
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

  const updateAdminDetails = async (values: FormTypes.UpdateAdminDto) => {
    setLoading(true);
    const { error, response } = await updateAdminDetailsAction(values);
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
  return { loading, form, updateAdminDetails };
};
