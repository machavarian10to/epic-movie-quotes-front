import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import { MotionPlugin } from "@vueuse/motion";
import router from "./router";

import UserRegister from "@/components/modals/UserRegister.vue";
import VerificationMessage from "@/components/modals/VerificationMessage.vue";
import ActivatedMessage from "@/components/modals/ActivatedMessage.vue";
import UserLogin from "@/components/modals/UserLogin.vue";
import ForgotPassword from "@/components/modals/ForgotPassword.vue";
import RecoveryMessage from "@/components/modals/RecoveryMessage.vue";
import NewPassword from "@/components/modals/NewPassword.vue";
import ResetMessage from "@/components/modals/ResetMessage.vue";

import "@/config/vee-validate/rules";
import "@/config/vee-validate/messages";
import "./index.css";

import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(pinia);
app.use(router);
app.use(MotionPlugin);

app.component("user-register", UserRegister);
app.component("verification-message", VerificationMessage);
app.component("activated-message", ActivatedMessage);
app.component("user-login", UserLogin);
app.component("forgot-password", ForgotPassword);
app.component("recovery-message", RecoveryMessage);
app.component("new-password", NewPassword);
app.component("reset-message", ResetMessage);

app.mount("#app");
