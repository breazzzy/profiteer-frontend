import * as Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Popper from "vue3-popper";
// import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// import Popper from "@popperjs/core";

//Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//Create and mount app
Vue.createApp(App)
  .component("Popper", Popper)
  .use(createPinia()) //.use(piniaPluginPersistedstate)
  .use(router)
  .mount("#app");
