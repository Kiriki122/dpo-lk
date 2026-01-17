import { create } from "zustand";

interface SessionStore {
  accessToken: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useSessionStore = create<SessionStore>((set) => ({
  accessToken: null,
  isAuthenticated: false,
  setToken: (token: string) => set({ accessToken: token, isAuthenticated: true }),
  clearToken: () => set({ accessToken: null, isAuthenticated: false }),
}));

const useAccessToken = () => useSessionStore((state) => state.accessToken);
const getAccessToken = () => useSessionStore.getState().accessToken;
const setToken = (token: string) => useSessionStore.getState().setToken(token);
const clearToken = () => useSessionStore.getState().clearToken();

const useIsAuthenticated = () => useSessionStore((state) => state.isAuthenticated);

export const sessionStore = {
  useAccessToken,
  getAccessToken,
  setToken,
  clearToken,

  useIsAuthenticated,
};
