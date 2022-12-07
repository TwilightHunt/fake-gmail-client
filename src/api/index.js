import axios from "axios";

const loginConfig = {
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const LoginApiInstanse = axios.create(loginConfig);

const defaultConfig = {
  withCredentials: true,
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const DefaultApiInstanse = axios.create(defaultConfig);
