import { create } from "zustand";

import type { User } from "../model/types";

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
}));

const useUser = () => useUserStore((state) => state.user);
const setUser = (user: User) => useUserStore.getState().setUser(user);
const clearUser = () => useUserStore.getState().clearUser();

export const userStore = {
  useUser,
  setUser,
  clearUser,
};
