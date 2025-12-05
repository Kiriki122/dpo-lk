import { create } from "zustand";
import { persist } from "zustand/middleware";

import { loginUserByEmail, logoutUser } from "../api/userApi";
import type { User } from "./types";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User | null) => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user: User | null) => set({ user }),
      setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
    }),
    {
      name: "user-store",
    }
  )
);

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await loginUserByEmail(data);
    localStorage.setItem("accessToken", response.accessToken);
    setUser(response.user);
    setIsAuthenticated(true);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const logout = async () => {
  await logoutUser();
  localStorage.removeItem("accessToken");
  setUser(null);
  setIsAuthenticated(false);
};

const setUser = (user: User | null) => useUserStore.getState().setUser(user);
const setIsAuthenticated = (isAuthenticated: boolean) => useUserStore.getState().setIsAuthenticated(isAuthenticated);

export const useUser = () => useUserStore((state) => state.user);
export const useIsAuth = () => useUserStore((state) => state.isAuthenticated);
