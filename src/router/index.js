import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Dash.vue";
import Register from "@/components/Register.vue";
import ChartTest from "@/components/GraphTestScreen.vue";
// Router
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Registration",
    component: Register,
  },
  {
    path: "/testchart",
    name: "Chart",
    component: ChartTest,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
