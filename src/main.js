import * as Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as d3 from "d3";

//Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//Create and mount app
Vue.createApp(App).use(router).mount("#app");
