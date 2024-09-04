"use client";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Check, PenBox, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { EditProjectNameDialog } from "../containers/edit-project-name-dialog";
import { getProjectDetailsQuery } from "../../_core/swr";
import { DeleteProjectDialog } from "../containers/delete-project-dialog";
import { Separator } from "@/components/ui/separator";
const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { data } = getProjectDetailsQuery({ id });
  const [allowEdit, setAllowEdit] = useState(false);
  const [newName, setNewName] = useState("");
  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex gap-3 items-center">
            {allowEdit ? (
              <Input
                className="border-none outline-none text-3xl font-bold w-fit"
                variant={"ghost"}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            ) : (
              <p className="text-3xl font-bold ">{data?.project.name}</p>
            )}
            {newName ? (
              <EditProjectNameDialog name={newName} projectId={id as string} />
            ) : (
              <Button
                variant={"outline"}
                className="w-fit h-fit rounded-full p-2 "
                onClick={() => setAllowEdit(true)}
                size={"icon"}
              >
                <PenBox size={20} strokeWidth={1.3} />
              </Button>
            )}
          </div>
          <p className="mt-2">
            Created {new Date(data?.project.createdAt!).toDateString()}
          </p>
        </div>
        <DeleteProjectDialog
          name={data?.project.name ?? ""}
          projectId={data?.project.id ?? ""}
        />
      </div>
      <Separator className="my-4" />
    </div>
  );
};
export default ProjectDetailsPage;
