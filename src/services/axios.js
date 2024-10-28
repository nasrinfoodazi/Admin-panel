import axios from "axios";
import { USER_INFO } from "../reactQueryProvider/QueryKeys";
import { enqueueSnackbar } from 'notistack';
const axiosParams = {
  baseURL: "http://localhost:3000",
};

let AxiosInstance = axios.create(axiosParams);
AxiosInstance.interceptors.request.use(
  function (config) {
    const userTokenInfo = localStorage.getItem(USER_INFO);
    if (userTokenInfo) {
      config.headers.Authorization = `Bearer ${userTokenInfo}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
AxiosInstance.interceptors.response.use(
  function (resp) {
    return resp;
  },
  function (error) {
    enqueueSnackbar(error.message, { variant: 'error' })
    if ([403, 401].includes(error?.status)) {
      localStorage.removeItem(USER_INFO);
      window.location.replace(window.location.origin + "/login");
    }
  }
);
export { AxiosInstance };
