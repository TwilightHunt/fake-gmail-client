import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/Auth.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../App.vue"),
    },
    {
      path: "/auth",
      name: "auth",
      component: AuthView,
    },
    {
      path: "/uid=:uid",
      name: "account",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/Profile.vue"),
    },
    { path: "/uid=:uid/section=:section/mail=:id", component: HomeView },
    { path: "/login", component: AuthView },
    { path: "/register", component: AuthView },
    { path: "/uid=:uid/section=:section", component: HomeView },
  ],
});

export default router;
