"use client";
import { useParams } from "next/navigation";
import { PenBox, Settings } from "lucide-react";

import { getProjectDetailsQuery } from "../queries";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { Skeleton } from "@/components/ui/skeleton";
const ProjectDetailsPage = () => {
  const { id } = useParams();
  const { project, projectIsLoading } = getProjectDetailsQuery({
    id: id as string,
  });
  return (
    <div className="flex justify-between">
      {projectIsLoading ? (
        <div>
          <Skeleton className="h-10 w-20 mb-3" />
          <Skeleton className="h-8 w-44" />
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">{project?.name}</h1>
          <p>{new Date(project?.createdAt ?? "").toDateString()}</p>
        </div>
      )}

      <Link href={ROUTES.PROJECT_SETTINGS(id as string)}>
        <Settings size={30} strokeWidth={1.5} />
      </Link>
    </div>
  );
};
export default ProjectDetailsPage;
