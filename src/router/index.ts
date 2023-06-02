import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/home",
      name: "home",
      component: () => import(/* webpackChunkName: "home" */ "@/views/HomeView.vue"),
      children: []
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import(/* webpackChunkName: "not-found" */ "@/views/NotFound.vue")
    }
  ]
});

router.beforeEach((to) => {
  const token = localStorage.getItem("token");
  if (to.path.startsWith("/home") && !token) return "/login";
});

export default router;
