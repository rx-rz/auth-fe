import { useToast } from "@/components/ui/use-toast";
import {
  UpdateAdminDto,
  UpdateAdminEmailDto,
  UpdateAdminEmailSchema,
  UpdateAdminPasswordDto,
  UpdateAdminPasswordSchema,
  UpdateAdminSchema,
} from "@/schemas/admin.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  updateAdminDetails,
  updateAdminEmail,
  updateAdminPassword,
} from "./actions";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export const useUpdateAdminEmail = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const { toast } = useToast();
  const updateAdminEmailForm = useForm<UpdateAdminEmailDto>({
    resolver: zodResolver(UpdateAdminEmailSchema),
    defaultValues: {
      currentEmail: user.email,
      newEmail: "",
      password: "",
    },
  });

  async function submitUpdateAdminEmailForm(values: UpdateAdminEmailDto) {
    setLoading(true);
    const { error, response } = await updateAdminEmail(values);
    if (response && response.success) {
      setUser({ ...user, email: values.newEmail });
      toast({
        title: "Admin email updated successfully",
      });
      router.push(ROUTES.PROJECTS);
    }
    if (error) {
      toast({
        variant: "destructive",
        title: error?.error,
      });
    }
    setLoading(false);
  }

  return { updateAdminEmailForm, loading, submitUpdateAdminEmailForm };
};

export const useUpdateAdminPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useUserStore();
  const updateAdminPasswordForm = useForm<UpdateAdminPasswordDto>({
    resolver: zodResolver(UpdateAdminPasswordSchema),
    defaultValues: {
      currentPassword: "",
      email: user.email,
      newPassword: "",
    },
  });

  async function submitUpdateAdminPasswordForm(values: UpdateAdminPasswordDto) {
    setLoading(true);
    const { error, response } = await updateAdminPassword(values);
    if (response && response.success) {
      toast({
        title: "Admin password updated successfully",
      });
      router.push(ROUTES.PROJECTS);
    }
    if (error) {
      toast({
        variant: "destructive",
        title: error?.error,
      });
    }
    setLoading(false);
  }
  return { updateAdminPasswordForm, loading, submitUpdateAdminPasswordForm };
};

export const useUpdateAdminDetails = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const { toast } = useToast();
  const updateAdminDetailsForm = useForm<UpdateAdminDto>({
    resolver: zodResolver(UpdateAdminSchema),
    defaultValues: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  async function submitUpdateAdminDetailsForm(values: UpdateAdminDto) {
    setLoading(true);
    const { error, response } = await updateAdminDetails(values);
    if (response && response.success) {
      setUser({
        ...user,
        firstName: values.firstName ?? user.firstName,
        lastName: values.lastName ?? user.lastName,
      });
      toast({
        title: "Admin details updated successfully",
      });
      router.push(ROUTES.PROJECTS);
    }
    if (error) {
      toast({
        variant: "destructive",
        title: error?.error,
      });
    }
    setLoading(false);
  }
  return { updateAdminDetailsForm, loading, submitUpdateAdminDetailsForm };
};
