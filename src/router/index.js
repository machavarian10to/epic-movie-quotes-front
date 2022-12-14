import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import EmailVerification from "@/views/EmailVerification.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import GoogleRedirect from "@/views/GoogleRedirect.vue";
import GoogleCallback from "@/views/GoogleCallback.vue";
import NewsFeed from "@/views/NewsFeed.vue";
import UserProfile from "@/views/UserProfile.vue";
import MoviesList from "@/views/MoviesList.vue";
import MovieDetail from "@/views/MovieDetail.vue";
import NotFound from "@/views/NotFound.vue";
import AccessDenied from "@/views/AccessDenied.vue";
import isAuthenticated from "@/router/guards";
import { useUserStore } from "@/stores/user";
import axios from "@/axios";

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
      beforeEnter: isAuthenticated,
    },
    {
      path: "/profile",
      name: "profile",
      component: UserProfile,
      beforeEnter: isAuthenticated,
    },
    {
      path: "/movies",
      name: "movies",
      component: MoviesList,
      beforeEnter: isAuthenticated,
    },
    {
      path: "/movies/:movie",
      name: "movie",
      component: MovieDetail,
      beforeEnter: isAuthenticated,
    },
    {
      path: "/forbidden",
      name: "forbidden",
      component: AccessDenied,
    },
    {
      path: "/:notFound(.*)*",
      name: "error",
      component: NotFound,
    },
  ],
});

router.beforeEach(async (_, _2, next) => {
  const userStore = useUserStore();

  if (userStore.authenticated === null) {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`);
      userStore.authenticated = true;
      userStore.userData = res.data.user;
    } catch (err) {
      userStore.authenticated = false;
    }
  }
  return next();
});
export default router;
