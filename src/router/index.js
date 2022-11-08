import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NewsFeed from "@/views/NewsFeed.vue";
import EmailVerification from "@/views/EmailVerification.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import GoogleRedirect from "@/views/GoogleRedirect.vue";
import GoogleCallback from "@/views/GoogleCallback.vue";
import { isAuthenticated } from "@/router/guards";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/email-verify/:id/:hash",
      name: "verify",
      component: EmailVerification,
    },
    {
      path: "/reset-password",
      name: "reset",
      component: ResetPassword,
    },
    {
      path: "/auth/google/redirect",
      name: "google_redirect",
      component: GoogleRedirect,
    },
    {
      path: "/auth/google/callback",
      name: "google_callback",
      component: GoogleCallback,
    },
    {
      path: "/feed",
      name: "feed",
      component: NewsFeed,
      beforeEnter: [isAuthenticated],
      // meta: {
      //   requiresAuth: true,
      // },
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next({ name: "home" });
//   } else if (isAuthenticated && to.name === "home") {
//     next({ name: "feed" });
//   } else {
//     next();
//   }
// });

export default router;
