import { defineStore } from "pinia";
import Cache from "@/utils/cache";
import router from "@/router";

export const useGlobalStore = defineStore("global", {
  state: () => {
    return {
      token: Cache.get("token") ?? "",
      id: Cache.get("id") ?? "",
      menu: Cache.get("menu") ? JSON.parse(Cache.get("menu") || "[]") : [],
      info: Cache.get("info") ? JSON.parse(Cache.get("info") || "{}") : {},
      firstMenu: Cache.get("firstMenu") ?? null
    };
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      Cache.set("token", token);
    },
    setId(id: string) {
      this.id = id;
      Cache.set("id", id);
    },
    setMenu(menu: any) {
      this.menu = menu;
      Cache.set("menu", JSON.stringify(menu));
    },
    setInfo(info: any) {
      this.info = info;
      Cache.set("info", JSON.stringify(info));
    },
    dynamicRouter() {
      const localRoutes: any[] = [];
      const files: Record<string, any> = import.meta.glob("@/router/main/**/*.ts", {
        eager: true
      });
      for (const path in files) {
        const module = files[path];
        localRoutes.push(module.default);
      }
      if (!this.menu) return;
      for (const item of this.menu as any[]) {
        for (const subMenu of item.children) {
          const route = localRoutes.find((item) => item.path === subMenu.url);
          if (route) router.addRoute("main", route);
          if (this.firstMenu === null && route) this.firstMenu = route;
        }
      }
    }
  }
});
