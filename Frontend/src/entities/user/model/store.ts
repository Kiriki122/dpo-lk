import { create } from "zustand";

import type { User } from "@/shared/types/user";
import { userApi } from "../api/api";

import type { AxiosError } from "axios";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: (user: User | null) => set({ user }),
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

export const useUser = () => useUserStore((state) => state.user);
export const useIsAuth = () => useUserStore((state) => state.isAuthenticated);
export const useUserIsLoading = () => useUserStore((state) => state.isLoading);

const setUser = (user: User | null) => useUserStore.getState().setUser(user);
const setIsAuthenticated = (isAuthenticated: boolean) => useUserStore.getState().setIsAuthenticated(isAuthenticated);
const setIsLoading = (isLoading: boolean) => useUserStore.getState().setIsLoading(isLoading);

const login = async (login: string, password: string) => {
  try {
    const response = await userApi.login(login, password);
    localStorage.setItem("accessToken", response.accessToken);
    setUser(response.user);
    setIsAuthenticated(true);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const logout = async () => {
  await userApi.logout();
  localStorage.removeItem("accessToken");
  setUser(null);
  setIsAuthenticated(false);
};

const checkAuth = async () => {
  setIsLoading(true);

  try {
    const data = await userApi.checkAuth();
    localStorage.setItem("accessToken", data.accessToken);
    setUser(data.user);
    setIsAuthenticated(true);
  } catch (error) {
    const e = error as AxiosError;
    console.error("Пользователь не авторизован:", e.message);
  } finally {
    setIsLoading(false);
  }
};

export const userController = {
  login,
  logout,
  checkAuth,
};
