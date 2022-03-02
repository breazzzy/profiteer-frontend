import * as Vue from "vue";
import App from "./App.vue";
import router from "./router";

//Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//Create and mount app
Vue.createApp(App).use(router).mount("#app");
