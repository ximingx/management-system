import { createApp } from "vue";
import router from "./router";
import setupPinia from "./stores";

import App from "./App.vue";
const app = createApp(App);

import "normalize.css";

app.use(setupPinia);
app.use(router);

app.mount("#app");
