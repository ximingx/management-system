import { createPinia } from "pinia";
import type { App } from "vue";
import { useGlobalStore } from "@/stores/global";
import router from "@/router";

const pinia = createPinia();

function setupPinia(app: App<Element>) {
  app.use(pinia);
  const globalStore = useGlobalStore();
  if (globalStore.token && globalStore.info && globalStore.menu) {
    globalStore.dynamicRouter();
    router.push("/main");
  }
}

export default setupPinia;
