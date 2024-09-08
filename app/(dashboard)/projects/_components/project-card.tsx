import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/lib/routes";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Props = {
  project: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
  };
};

export const ProjectCard = ({ project }: Props) => {
  const { id, name, updatedAt } = project;
  return (
    <Link
      href={ROUTES.PROJECT_DETAILS(id)}
      key={id}
      className="border w-full h-48 p-5 flex flex-col group relative hover:bg-slate-100 "
    >
      <ArrowUpRight
        className="bg-primary p-1 rounded-full absolute top-5 hidden group-hover:block right-5"
        stroke="#fff"
      />
      <h2 className="text-xl font-bold">{name}</h2>
      <div className="mt-auto">
        <Separator />
        <p className="text-sm mt-1 text-right">
          Last updated{" "}
          <span className="font-bold opacity-90">
            {new Date(updatedAt ?? "").toDateString()}
          </span>
        </p>
      </div>
    </Link>
  );
};
