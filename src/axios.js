import axios from "axios";
import { useUserStore } from "@/stores/user.js";
import router from "@/router/index";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      const userStore = useUserStore();
      userStore.authenticated = false;
      router.push({ name: "home" });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
