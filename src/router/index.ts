import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/main",
      name: "main",
      component: () => import(/* webpackChunkName: "main" */ "@/views/HomeView.vue"),
      children: []
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import(/* webpackChunkName: "not-found" */ "@/views/NotFound/NotFound.vue")
    }
  ]
});

router.beforeEach((to) => {
  const token = localStorage.getItem("token");
  if (to.path.startsWith("/main") && !token) {
    return "/login";
  }
});

export default router;
