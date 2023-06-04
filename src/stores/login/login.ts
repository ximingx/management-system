import { defineStore } from "pinia";
import { getUserInfoRequest, getUserMenuRequest, loginRequest } from "@/services/modules/login";
import { useGlobalStore } from "@/stores/global";
import Cache from "@/utils/cache";
import router from "@/router";

export const useLoginStore = defineStore("login-form", {
  state: () => {
    return {
      username: Cache.get("username") ?? "",
      password: Cache.get("password") ?? "",
      cellphone: Cache.get("phone") ?? "",
      security: Cache.get("security") ?? "",
      loginWay: Cache.get("loginWay") ?? "account",
      remember: Boolean(Cache.get("remember")) ?? false
    };
  },
  actions: {
    async loginAction(data: any) {
      const res = await loginRequest(data).catch((err) => console.log(err));
      if (res.code !== 0) return;
      const globalStore = useGlobalStore();
      globalStore.setToken(res.data.token);
      globalStore.setId(res.data.id);
      const userInfo = await getUserInfoRequest(globalStore.id).catch((err) => console.log(err));
      const userMenu = await getUserMenuRequest(globalStore.id).catch((err) => console.log(err));
      globalStore.setInfo(userInfo.data);
      globalStore.setMenu(userMenu.data);
      if (this.remember) {
        Cache.set("remember", true);
        Cache.set("username", this.username);
        Cache.set("password", this.password);
      }
      globalStore.dynamicRouter();
      console.log(123);
      router.push("/main");
    },
    async exitAction() {
      Cache.clear();
      if (this.remember) {
        Cache.set("remember", true);
        Cache.set("username", this.username);
        Cache.set("password", this.password);
      }
      this.$reset();
      const globalStore = useGlobalStore();
      globalStore.$reset();
      await router.push("/login");
    }
  }
});
