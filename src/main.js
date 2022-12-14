import { createApp, markRaw, watchEffect } from "vue";
import { createPinia } from "pinia";
import router from "./router";

import i18n from "@/i18n/index";

import ActivatedMessage from "@/components/modals/ActivatedMessage.vue";
import ForgotPassword from "@/components/modals/ForgotPassword.vue";
import NewPassword from "@/components/modals/NewPassword.vue";
import RecoveryMessage from "@/components/modals/RecoveryMessage.vue";
import ResetMessage from "@/components/modals/ResetMessage.vue";
import UserLogin from "@/components/modals/UserLogin.vue";
import UserRegister from "@/components/modals/UserRegister.vue";
import VerificationMessage from "@/components/modals/VerificationMessage.vue";
import AddEmail from "@/components/modals/AddEmail.vue";
import AddMovie from "@/components/modals/AddMovie.vue";
import AddQuote from "@/components/modals/AddQuote.vue";
import EditMovie from "@/components/modals/EditMovie.vue";
import ViewQuote from "@/components/modals/ViewQuote.vue";
import EditQuote from "@/components/modals/EditQuote.vue";
import FeedQuote from "@/components/modals/FeedQuote.vue";

import "@/config/vee-validate/rules";
import "@/config/vee-validate/messages";
import "./index.css";

import App from "./App.vue";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

watchEffect(() => {
  Pusher.Runtime.createXHR = function () {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    return xhr;
  };

  window.Echo = new Echo({
    authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/broadcasting/auth`,
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
  });
});

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(pinia);
app.use(router);
app.use(i18n);

app.component("user-register", UserRegister);
app.component("verification-message", VerificationMessage);
app.component("activated-message", ActivatedMessage);
app.component("user-login", UserLogin);
app.component("forgot-password", ForgotPassword);
app.component("recovery-message", RecoveryMessage);
app.component("new-password", NewPassword);
app.component("reset-message", ResetMessage);
app.component("add-email", AddEmail);
app.component("add-movie", AddMovie);
app.component("add-quote", AddQuote);
app.component("edit-movie", EditMovie);
app.component("view-quote", ViewQuote);
app.component("edit-quote", EditQuote);
app.component("feed-quote", FeedQuote);

app.mount("#app");
