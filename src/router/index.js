import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/pages/HomeView.vue";
import NewsFeed from "@/pages/NewsFeed.vue";
import EmailVerification from "@/pages/EmailVerification.vue";
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
      path: "/feed",
      name: "feed",
      component: NewsFeed,
      beforeEnter: [isAuthenticated],
      // meta: {
      //   requiresAuth: true,
      // },
    },
    {
      path: "/email-verify/:id/:hash",
      name: "verify",
      component: EmailVerification,
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
