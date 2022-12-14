import router from "@/router/index";
import { useUserStore } from "@/stores/user";

const isAuthenticated = () => {
  const userStore = useUserStore();
  if (!userStore.authenticated) {
    return router.push({ name: "forbidden" });
  }
};

export default isAuthenticated;
