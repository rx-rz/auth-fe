import { decodeUserToken, User } from "@/lib/utils";
import { cookies } from "next/headers";

export default async function Home() {
  const user: User | undefined = decodeUserToken(
    cookies().get("accessToken")?.value
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello, {user?.firstName} {user?.lastName}
    </main>
  );
}
