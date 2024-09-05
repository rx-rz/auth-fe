"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateProjectName } from "../../_containers/update-project-name";
import GetNewProjectApiKeys from "../../_containers/get-new-project-api-keys";
import { Separator } from "@/components/ui/separator";
import { DeleteProject } from "../../_containers/delete-project";
import { getProjectDetailsQuery } from "../../queries";
import { useParams } from "next/navigation";

const ProjectSettingsPage = () => {
  const { id } = useParams();
  const { project } = getProjectDetailsQuery({ id: id as string });

  return (
    <Tabs
      defaultValue="general"
      orientation="vertical"
      className="max-w-[500px]"
    >
      <TabsList className="min-w-[500px]">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="rbac">Role And Permission Management</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="flex flex-col gap-5 mt-5">
        <UpdateProjectName
          name={project?.name ?? ""}
          projectId={project?.id ?? ""}
        />
        <Separator />
        <GetNewProjectApiKeys />
        <Separator />
        <div>
          <h3 className="font-bold text-red-500 mb-3">Danger Zone</h3>
          <DeleteProject
            name={project?.name ?? ""}
            projectId={project?.id ?? ""}
          />
        </div>
      </TabsContent>
      <TabsContent value="rbac">Change your password here.</TabsContent>
    </Tabs>
  );
};
export default ProjectSettingsPage;
