import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const ProjectsPage = () => {
  return (
    <div>
      <h1 className="text-2xl mt-1 opacity-80 font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-5 gap-4">
        <Button variant={"ghost"} className="border w-full h-48 flex-col">
          <PlusIcon size={50} className="mb-2" strokeWidth={1.2}/>
          <p className="font-medium opacity-70 text-base">Add A Project</p>
        </Button>
        <div className="border w-full h-48"></div>
        <div className="border w-full h-48"></div>
        <div className="border w-full h-48"></div>
        <div className="border w-full h-48"></div>
      </div>
    </div>
  );
};

export default ProjectsPage;
