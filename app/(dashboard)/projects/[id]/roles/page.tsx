"use client";

import { useParams } from "next/navigation";
import { getProjectRolesQuery } from "@/app/(dashboard)/_core/swr";
import { Card, CardFooter } from "@/components/ui/card";
import { ArrowDown, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoleCard } from "../../_components/role-card";

const ProjectRolesPage = () => {
  const { id } = useParams();
  const { data, rolesAreLoading } = getProjectRolesQuery({
    projectId: id as string,
  });
  return (
    <div>
      <h1 className="font-bold text-3xl">Roles</h1>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {data && data.roles.map((role) => <RoleCard role={role} />)}
      </div>
    </div>
  );
};

export default ProjectRolesPage;
