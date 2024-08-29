import { Layers, UserCircle } from "lucide-react";
import { Logo } from "./ui/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { decodeUserToken, User } from "@/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { LogoutButton } from "./logout-button";

export const Sidebar = () => {
  const user: User | undefined = decodeUserToken(
    cookies().get("accessToken")?.value
  );

  return (
    <div className="w-12 h-screen border py-3 flex flex-col items-center gap-5">
      <Link href={ROUTES.LOGIN}>
        <Logo />
      </Link>
      <Link href={ROUTES.PROJECTS}>
        <Layers />
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-fit mx-auto mt-auto">
          <UserCircle size={32} strokeWidth={1.2} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-3 font-satoshi ml-2 mb-2">
          <DropdownMenuLabel className="flex">
            <p>
              {user?.firstName} {user?.lastName}
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={ROUTES.UPDATE_EMAIL}>Change email</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={ROUTES.UPDATE_PASSWORD}>Change password</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={ROUTES.UPDATE_DETAILS}>Update details</Link>
          </DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
