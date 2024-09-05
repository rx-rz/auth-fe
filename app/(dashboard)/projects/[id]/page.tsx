"use client";
import { useParams } from "next/navigation";
import { PenBox, Settings } from "lucide-react";

import { getProjectDetailsQuery } from "../queries";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { project, projectIsLoading } = getProjectDetailsQuery({
    id: id as string,
  });
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="text-2xl font-bold">{project?.name}</h1>
        <p>{new Date(project?.createdAt ?? "").toDateString()}</p>
      </div>
      <Link href={ROUTES.LOGIN}>
        <Settings size={30} strokeWidth={1.5} />
      </Link>
    </div>
  );
};
export default ProjectDetailsPage;
