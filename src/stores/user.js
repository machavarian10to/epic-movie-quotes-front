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
        .then((res) => {
          setToken(res.data.access_token, res.data.expires_in);
        })
        .catch((err) => console.log(err));
    },
    googleAuth() {
      return axios
        .get("/google/redirect")
        .then((res) => {
          this.router.push({
            name: "google_redirect",
            query: { url: res.data.url },
          });
        })
        .catch((err) => console.log(err));
    },
    login(user) {
      axios
        .post("/login", user)
        .then((res) => {
          setToken(res.data.access_token, res.data.expires_in);
          this.router.push({ name: "feed" });
        })
        .catch((err) => console.log(err));
    },
    resetPassword(user) {
      axios
        .post("/forgot-password", user)
        .then(() => console.log("Email sent successfully!"))
        .catch((err) => console.log(err));
    },
    updatePassword(user) {
      axios
        .post("/reset-password", user)
        .then(() => console.log("Password updated successfully!"))
        .catch((err) => console.log(err));
    },
    logout() {
      return axios
        .post("/logout")
        .then(() => {
          deleteToken();
          this.userData = null;
        })
        .catch((err) => console.log(err));
    },
  },
});
