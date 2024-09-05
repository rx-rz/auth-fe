"use client";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/user.store";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { logoutAdmin } from "@/app/(dashboard)/profile/actions";

export const LogoutButton = () => {
  const { setUser } = useUserStore();
  const router = useRouter();
  const { toast } = useToast();
  return (
    <Button
      variant={"destructive"}
      size={"sm"}
      className="h-8 w-full text-left mt-1 justify-start"
      onClick={async () => {
        const { error, response } = await logoutAdmin();
        if (error) {
          toast({
            title: error?.error,
          });
        }
        if (response && response.success === true) {
          setUser({});
          router.push(ROUTES.LOGIN);
        }
      }}
    >
      Log out
    </Button>
  );
};
