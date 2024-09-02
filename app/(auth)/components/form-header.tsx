import { Logo } from "@/components/ui/logo";

export const FormHeader = ({ title }: { title: string }) => {
  return (
    <div className="">
      <Logo />
      <p className="font-medium text-xl opacity-90">{title}</p>
    </div>
  );
};
