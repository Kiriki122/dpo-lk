import { create } from "zustand";

import type { User } from "../model/types";

type UserStore = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user: User) => set({ user, isLoading: false }),
  clearUser: () => set({ user: null, isLoading: false }),
}));

const useUser = () => useUserStore((state) => state.user);
const setUser = (user: User) => useUserStore.getState().setUser(user);
const clearUser = () => useUserStore.getState().clearUser();

const useIsLoading = () => useUserStore((state) => state.isLoading);

export const userStore = {
  useUser,
  setUser,
  clearUser,

  useIsLoading,
};
