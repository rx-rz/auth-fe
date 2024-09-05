import { useShowToast } from "@/lib/hooks";
import {
  CreateProjectDto,
  CreateProjectSchema,
  DeleteProjectSchema,
  UpdateProjectNameDto,
  UpdateProjectNameSchema,
} from "@/schemas/project.schemas";
import { useUserStore } from "@/store/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  createProject,
  createRole,
  deleteProject,
  deleteRole,
  getProjectKeys,
  updateProjectName,
  updateRoleName,
} from "./actions";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import {
  CreateRoleDto,
  CreateRoleSchema,
  RoleNameSchema,
  UpdateRoleNameDto,
  UpdateRoleNameSchema,
} from "@/schemas/rbac.schemas";

export const useCreateNewProject = () => {
  const { showToast } = useShowToast();
  const [loading, setLoading] = useState(false);
  const { user } = useUserStore();
  const [keys, setKeys] = useState({
    clientKey: "",
    apiKey: "",
  });
  const [success, setSuccess] = useState(false);
  const form = useForm<CreateProjectDto>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: {
      adminId: user.id ?? "",
    },
  });

  const submitCreateNewProjectForm = async (values: CreateProjectDto) => {
    setLoading(true);
    const { error, response } = await createProject(values);
    if (response && response.success) {
      setLoading(false);
      const { response: projectKeysResponse } = await getProjectKeys({
        projectId: response.project.id,
      });
      if (projectKeysResponse && projectKeysResponse.success) {
        setKeys({
          apiKey: projectKeysResponse.apiKey,
          clientKey: projectKeysResponse.clientKey,
        });
        setSuccess(true);
      }
    }
    if (error) {
      showToast({
        error,
      });
      setLoading(false);
    }
  };

  return { loading, success, keys, form, submitCreateNewProjectForm };
};

export const useUpdateProjectName = () => {
  const { showToast } = useShowToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<UpdateProjectNameDto>({
    resolver: zodResolver(UpdateProjectNameSchema),
  });

  const submitUpdateProjectNameForm = async (values: UpdateProjectNameDto) => {
    setLoading(true);
    const { error } = await updateProjectName(values);
    if (error) {
      showToast({ error });
    }
    setLoading(false);
  };

  return { loading, form, submitUpdateProjectNameForm };
};

export const useDeleteProject = ({ projectId }: { projectId: string }) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useShowToast();
  const form = useForm<{ name: string }>({
    resolver: zodResolver(DeleteProjectSchema),
    mode: "onTouched",
  });
  const router = useRouter();

  const submitDeleteProjectForm = async () => {
    setLoading(true);
    const { error, response } = await deleteProject({ projectId });
    if (error) {
      showToast({ error });
    }
    if (response && response.success) {
      router.push(ROUTES.PROJECTS);
    }
  };
  return { loading, form, submitDeleteProjectForm };
};

export const useCreateRole = ({ projectId }: { projectId: string }) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useShowToast();
  const form = useForm<CreateRoleDto>({
    resolver: zodResolver(RoleNameSchema),
  });

  const submitCreateRoleForm = async (body: CreateRoleDto) => {
    setLoading(true);
    const { error, response } = await createRole({ ...body, projectId });
    if (error) {
      showToast({ error });
    }
    if (response && response.success) {
      location.reload();
    }
  };

  return { loading, form, submitCreateRoleForm };
};

export const useUpdateRoleName = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useShowToast();
  const form = useForm<UpdateRoleNameDto>({
    resolver: zodResolver(UpdateRoleNameSchema),
  });

  const submitUpdateRoleNameForm = async (body: UpdateRoleNameDto) => {
    setLoading(false);
    const { error, response } = await updateRoleName(body);
    if (error) {
      showToast({ error });
    }
    if (response && response.success) {
      location.reload();
    }
  };
  return { loading, form, submitUpdateRoleNameForm };
};

export const useDeleteRole = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useShowToast();

  const deleteRoleMutation = async ({ roleId }: { roleId: string }) => {
    setLoading(true);
    const { error, response } = await deleteRole({ roleId });
    if (error) {
      showToast({ error });
    }
    if (response && response.success) {
      location.reload();
    }
    setLoading(false);
  };
  return { loading, deleteRoleMutation };
};
