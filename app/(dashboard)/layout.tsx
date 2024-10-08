import { Sidebar } from "@/components/sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen font-satoshi">
      <div className="overflow-hidden h-full flex">
        <Sidebar />
        <div className="p-5 ml-5 h-screen overflow-y-scroll pb-48 flex-1 mt-1">{children}</div>
      </div>
    </div>
  );
}
