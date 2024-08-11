import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "@/lib/utils";

type UserState = {
  user: Partial<User>;
  setUser: (user: Partial<User>) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {},
      setUser: (user) => {
        set(() => ({ user: user }));
      },
    }),
    {
      name: "user-props",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
