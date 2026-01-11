const TOKEN_KEY = "accessToken";

const getAccessToken = () => localStorage.getItem(TOKEN_KEY);

const setAccessToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);

const removeAccessToken = () => localStorage.removeItem(TOKEN_KEY);

export const tokenService = {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
};
