import { useShowToast } from "@/lib/hooks";
import {
  CreateProjectDto,
  CreateProjectSchema,
  DeleteProjectSchema,
  ProjectIdDto,
  UpdateProjectNameDto,
  UpdateProjectNameSchema,
} from "@/schemas/project.schemas";
import { useUserStore } from "@/store/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import {
  AssignPermissionToRoleDto,
  CreatePermissionDto,
  CreatePermissionSchema,
  CreateRoleDto,
  CreateRoleSchema,
  RoleNameSchema,
  UpdatePermissionDto,
  UpdatePermissionSchema,
  UpdateRoleNameDto,
  UpdateRoleNameSchema,
} from "@/schemas/rbac.schemas";
import { api } from "@/lib/axios";
import {
  assignPermissionToRoleAction,
  createPermissionAction,
  createProjectAction,
  createRoleAction,
  deletePermissionAction,
  deleteProjectAction,
  deleteRoleAction,
  getProjectKeysAction,
  updatePermissionAction,
  updateProjectNameAction,
  updateRoleNameAction,
} from "./actions";

export const createNewProjectMutation = () => {
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

  const createNewProject = async (values: CreateProjectDto) => {
    setLoading(true);
    const { error, response } = await createProjectAction(values);
    if (response && response.success) {
      setLoading(false);
      const { response: projectKeysResponse } = await getProjectKeysAction({
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

  return { loading, success, keys, form, createNewProject };
};

export const updateProjectNameMutation = () => {
  const { showToast } = useShowToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<UpdateProjectNameDto>({
    resolver: zodResolver(UpdateProjectNameSchema),
  });

  const updateProjectName = async (values: UpdateProjectNameDto) => {
    setLoading(true);
    const { error } = await updateProjectNameAction(values);
    if (error) {
      showToast({ error });
    }
    setLoading(false);
  };

  return { loading, form, updateProjectName };
};

export const deleteProjectMutation = ({ projectId }: { projectId: string }) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useShowToast();
  const form = useForm<{ name: string }>({
    resolver: zodResolver(DeleteProjectSchema),
    mode: "onTouched",
  });
  const router = useRouter();

  const deleteProject = async () => {
    setLoading(true);
    const { error, response } = await deleteProjectAction({ projectId });
    if (error) {
      showToast({ error });
    }
    if (response && response.success) {
      router.push(ROUTES.PROJECTS);
    }
  };
  return { loading, form, deleteProject };
};

export const createRoleMutation = ({ projectId }: { projectId: string }) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useShowToast();
  const form = useForm<CreateRoleDto>({
    resolver: zodResolver(RoleNameSchema),
  });

  const createRole = async (body: CreateRoleDto) => {
    setLoading(true);
    const { error, response } = await createRoleAction({ ...body, projectId });
    if (error) {
      showToast({ error });
    }
    if (response && response.success) {
      location.reload();
    }
  };

  return { loading, form, createRole };
};

export const updateRoleNameMutation = ({ roleId }: { roleId: string }) => {
  const [loading, setLoading] = useState(false);

  const { showToast } = useShowToast();
  const form = useForm<{ name: string }>({
    resolver: zodResolver(RoleNameSchema),
  });

  const updateRoleName = async (body: { name: string }) => {
    setLoading(false);
    const { error, response } = await updateRoleNameAction({ ...body, roleId });
    if (error) {
      showToast({ error });
    }
    if (response && response.success) {
      location.reload();
    }
  };
  return { loading, form, updateRoleName };
};

export const deleteRoleMutation = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useShowToast();

  const deleteRole = async ({ roleId }: { roleId: string }) => {
    setLoading(true);
    const { error, response } = await deleteRoleAction({ roleId });
    if (error) {
      showToast({ error });
    }
    if (response && response.success) {
      location.reload();
    }
    setLoading(false);
  };
  return { loading, deleteRole };
};

export const createPermissionMutaion = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useShowToast();

  const form = useForm<CreatePermissionDto>({
    resolver: zodResolver(CreatePermissionSchema),
  });

  const createPermission = async (body: CreatePermissionDto) => {
    setLoading(true);
    const { error, response } = await createPermissionAction(body);
    if (error) showToast({ error });
    if (response && response.success) location.reload();
    setLoading(false);
  };

  return { loading, form, createPermission };
};

export const updatePermissionMutation = ({
  permissionId,
}: {
  permissionId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useShowToast();

  const form = useForm<{ name: string; description?: string }>({
    resolver: zodResolver(UpdatePermissionSchema),
  });

  const updatePermission = async (body: UpdatePermissionDto) => {
    setLoading(false);
    const { error, response } = await updatePermissionAction({
      ...body,
      permissionId,
    });
    if (error) {
      showToast({ error });
    }
    if (response && response.success) location.reload();
  };

  return { loading, form, updatePermission };
};

export const assignPermissionToRoleMutation = ({
  permissionId,
  roleId,
}: AssignPermissionToRoleDto) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useShowToast();

  const assignPermissionToRole = async () => {
    setLoading(true);
    const { error, response } = await assignPermissionToRoleAction({
      permissionId,
      roleId,
    });
    if (error) showToast({ error });
    if (response && response.success) location.reload();
  };
  return { loading, assignPermissionToRole };
};

export const deletePermissionMutation = ({
  permissionId,
}: {
  permissionId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useShowToast();

  const deletePermission = async () => {
    setLoading(true);
    const { error, response } = await deletePermissionAction({ permissionId });
    if (error) {
      showToast({ error });
    }
    if (response && response.success) location.reload();
  };

  return { loading, deletePermission };
};
