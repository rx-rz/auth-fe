import { Check } from "lucide-react";
import ConfirmationDialog from "@/components/confirmation-dialog";
import { updateProjectNameMutation } from "../mutations";

export const EditProjectNameDialog = ({
  projectId,
  name,
}: {
  projectId: string;
  name: string;
}) => {
  const { updateProjectName, loading } = updateProjectNameMutation();

  return (
    <ConfirmationDialog
      onConfirm={async () => await updateProjectName({ name, projectId })}
      title="Are you sure you want to update the name of this project to"
      trigger={<Check stroke="white" />}
      confirmButtonText="Yes, Update"
      isLoading={loading}
    />
  );
};
