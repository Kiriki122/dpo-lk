import { create } from "zustand";

import type { User } from "../model/types";

type UserStore = {
  user: User | null;
};

const useUserStore = create<UserStore>(() => ({
  user: null,
}));

const useUser = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    throw new Error("useUser must be used within an authenticated boundary");
  }

  return user;
};
const setUser = (user: User) => useUserStore.setState({ user });
const clearUser = () => useUserStore.setState({ user: null });

export const userStore = {
  useUser,
  setUser,
  clearUser,
};
