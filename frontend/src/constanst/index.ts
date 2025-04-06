const API_URL = import.meta.env.VITE_API_URL as string;
const STORAGE_ACCESS_TOKEN_KEY = "accessToken";
const STORAGE_REFRESH_TOKEN_KEY = "refreshToken";
const BASE_PATH = import.meta.env.BASE_URL as string;

export {
  API_URL,
  STORAGE_REFRESH_TOKEN_KEY,
  STORAGE_ACCESS_TOKEN_KEY,
  BASE_PATH,
};
