import { defineStore } from "pinia";
import axios from "@/axios";
import { setToken } from "@/components/helpers/index";
import { deleteToken } from "@/components/helpers";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userData: null,
  }),
  actions: {
    register(user) {
      return axios
        .post("/register", user)
        .then(() => {
          console.log("Registration Successful!");
        })
        .catch((err) => console.log(err) && alert(err.response.data.message));
    },
    login(user) {
      axios
        .post("/login", user)
        .then((response) => {
          /* --- LOG --- */
          console.log("Login Successful--->", response);
          setToken(response.data.access_token, response.data.expires_in);
          this.userData = response.data.user;
          this.router.push({ name: "feed" });
        })
        .catch((err) => console.log(err) && alert(err.response.data.message));
    },
    logout() {
      return axios
        .post("/logout")
        .then(() => {
          deleteToken();
          this.userData = null;
        })
        .catch((err) => console.log(err.response.data.message));
    },
  },
});
