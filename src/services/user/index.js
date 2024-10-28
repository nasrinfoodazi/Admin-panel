import { AxiosInstance } from "../axios";
export const RegisterService = (payload) =>
  AxiosInstance.post("/auth/register", payload);
export const LoginService = (payload) =>
  AxiosInstance.post("/auth/login", payload);
