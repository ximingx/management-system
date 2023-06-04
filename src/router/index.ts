import { createRouter, createWebHistory } from "vue-router";
import { useGlobalStore } from "@/stores/global";
import LoginView from "@/views/LoginView.vue";
import Cache from "@/utils/cache";

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
      component: () => import(/* webpackChunkName: "main" */ "@/views/HomeView.vue")
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import(/* webpackChunkName: "not-found" */ "@/views/NotFound/NotFound.vue")
    }
  ]
});

router.beforeEach((to) => {
  const token = Cache.get("token");

  if (to.path.startsWith("/main") && !token) {
    return "/login";
  }

  if (to.path === "/main") {
    const globalStore = useGlobalStore();
    return (globalStore.firstMenu as any).path;
  }
});

export default router;
