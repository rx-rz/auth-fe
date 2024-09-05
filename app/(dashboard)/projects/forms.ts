import { useShowToast } from "@/lib/hooks";
import {
  CreateProjectDto,
  CreateProjectSchema,
  UpdateProjectNameDto,
  UpdateProjectNameSchema,
} from "@/schemas/project.schemas";
import { useUserStore } from "@/store/user.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createProject, getProjectKeys, updateProjectName } from "./actions";

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

export const useUpdateProjectName = ({ projectId }: { projectId: string }) => {
  const { showToast } = useShowToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<UpdateProjectNameDto>({
    resolver: zodResolver(UpdateProjectNameSchema),
    defaultValues: {
      projectId,
    },
  });

  const submitUpdateProjectName = async (values: UpdateProjectNameDto) => {
    setLoading(true);
    const { error } = await updateProjectName(values);
    if (error) {
      showToast({ error });
    }
  };
  return { loading, form, submitUpdateProjectName };
};
