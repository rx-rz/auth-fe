import { ROUTES } from "@/lib/routes";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { getAllAdminProjects } from "../_core/actions";
import { decodeUserToken, User } from "@/lib/utils";
import { cookies } from "next/headers";

const ProjectsPage = async () => {
  const user: User | undefined = decodeUserToken(
    cookies().get("accessToken")?.value
  );
  const { response, error } = await getAllAdminProjects({
    adminId: user?.id ?? "",
  });
  console.log({response, error})
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
        {response?.projects ? (
          response.projects.map((project) => (
            <div key={project.id} className="border w-full h-48">
              <p>{project.name}</p>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
