import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";
import { loginRequest, getUserInfoRequest, getUserListRequest } from "@/services/modules/login";
import Cache from "@/utils/cache";
import router from "@/router";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      token: Cache.get("token") ?? "",
      login: {
        username: Cache.get("username") ?? "",
        password: Cache.get("password") ?? "",
        phone: Cache.get("phone") ?? "",
        security: Cache.get("security") ?? "",
        loginWay: "account",
        remember: Boolean(Cache.get("remember")) ?? false
      },
      info: JSON.parse(Cache.get("info") || "{}") || {},
      menu: JSON.parse(Cache.get("menu") || "{}") || []
    };
  },
  actions: {
    async loginAction(data: any) {
      const res = await loginRequest(data).catch((err) => console.log(err));
      if (res.code !== 0) return;
      this.token = res.data.token;
      Cache.set("token", this.token);
      const id = res.data.id;
      const userInfo = await getUserInfoRequest(id).catch((err) => console.log(err));
      const userMenu = await getUserListRequest(id).catch((err) => console.log(err));
      this.info = userInfo.data;
      this.menu = userMenu.data;
      this.dynamicRouter(userMenu.data);
      this.cacheAction(userMenu.data, userInfo.data);
      await router.push("/home");
    },
    cacheAction(userMenu: any, userInfo: any) {
      if (this.login.remember) {
        Cache.set("remember", true);
        Cache.set("username", this.login.username);
        Cache.set("password", this.login.password);
      }
      Cache.set("info", JSON.stringify(userInfo));
      Cache.set("menu", JSON.stringify(userMenu));
    },
    dynamicRouter(menu: any) {
      const localRoutes: RouteRecordRaw[] = [];
      const files: Record<string, any> = import.meta.glob("@/router/home/**/*.ts", {
        eager: true
      });
      for (const path in files) {
        const module = files[path];
        localRoutes.push(module.default);
      }
      // 老六删我数据
      if (!menu) return;
      for (const item of menu) {
        for (const subMenu of item.children) {
          const route = localRoutes.find((item) => item.path === subMenu.url);
          if (route) {
            router.addRoute("home", route);
          }
        }
      }
    },
    async exitAction() {
      Cache.clear();
      if (this.login.remember) {
        Cache.set("remember", true);
        Cache.set("username", this.login.username);
        Cache.set("password", this.login.password);
      }
      this.$reset();
      await router.push("/login");
    }
  }
});
