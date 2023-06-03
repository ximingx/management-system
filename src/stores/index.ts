import { createPinia } from "pinia";
import type { App } from "vue";
import { useUserStore } from "@/stores/user";

const pinia = createPinia();

function setupPinia(app: App<Element>) {
  app.use(pinia);
  const userStore = useUserStore();
  userStore.loadCacheAction();
}

export default setupPinia;
