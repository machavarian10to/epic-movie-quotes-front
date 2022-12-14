import { defineStore } from "pinia";
import axios from "@/axios";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userData: null,
    authenticated: null,
  }),
  actions: {
    register(user) {
      return axios
        .post("/register", user)
        .then((res) => console.log(res))
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
          this.userData = res.data.user;
          this.authenticated = true;
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
    addEmail(email) {
      axios
        .post("/add-email", email)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },
    logout() {
      axios
        .post("/logout")
        .then(() => {
          this.userData = null;
          this.authenticated = false;
        })
        .catch((err) => console.log(err));
    },
  },
});
