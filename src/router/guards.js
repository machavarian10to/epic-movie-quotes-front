import { getToken } from "@/components/helpers/index";

export function isAuthenticated() {
  if (!getToken()) {
    return { name: "home" };
  }
}
