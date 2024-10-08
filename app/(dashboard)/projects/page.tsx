"use client";
import { ROUTES } from "@/lib/routes";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "./_components/project-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAdminProjectsQuery } from "./queries";

const ProjectsPage = () => {
  const { projects, projectsIsLoading } = getAdminProjectsQuery();
  return (
    <div>
      <h1 className="text-2xl mt-1 opacity-80 font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-5 gap-4">
        <Link
          href={ROUTES.NEW_PROJECT}
          className="border shadow-sm flex items-center justify-center  w-full h-48 flex-col"
        >
          <PlusIcon size={50} className="mb-2" strokeWidth={1.2} />
          <p className="font-medium opacity-70 text-base">Add A Project</p>
        </Link>
        {projectsIsLoading ? (
          <>
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </>
        ) : (
          <></>
        )}
        {projects ? (
          projects.map((project) => <ProjectCard project={project} />)
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
