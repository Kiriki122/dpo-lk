import { create } from "zustand";

interface SessionStore {
  accessToken: string | null;
  isAuthenticated: boolean;
}

const useSessionStore = create<SessionStore>(() => ({
  accessToken: null,
  isAuthenticated: false,
}));

const useAccessToken = () => useSessionStore((state) => state.accessToken);
const useIsAuthenticated = () => useSessionStore((state) => state.isAuthenticated);

const getAccessToken = () => useSessionStore.getState().accessToken;
const setToken = (token: string) => useSessionStore.setState({ accessToken: token, isAuthenticated: true });
const clearToken = () => useSessionStore.setState({ accessToken: null, isAuthenticated: false });

export const sessionStore = {
  useAccessToken,
  useIsAuthenticated,

  getAccessToken,
  setToken,
  clearToken,
};
