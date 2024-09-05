import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateProjectName } from "../../_containers/update-project-name";

const ProjectSettingsPage = () => {
  return (
    <Tabs defaultValue="general" orientation="vertical">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="rbac">Role And Permission Management</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <UpdateProjectName />
      </TabsContent>
      <TabsContent value="rbac">Change your password here.</TabsContent>
    </Tabs>
  );
};
export default ProjectSettingsPage;
