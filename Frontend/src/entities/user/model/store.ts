import { create } from "zustand";

import type { User } from "../model/types";

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));

const useUser = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    throw new Error("useUser must be used within an authenticated boundary");
  }

  return user;
};
const setUser = (user: User) => useUserStore.getState().setUser(user);
const clearUser = () => useUserStore.getState().clearUser();

export const userStore = {
  useUser,
  setUser,
  clearUser,
};
