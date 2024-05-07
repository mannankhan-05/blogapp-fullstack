import { createRouter, createWebHistory } from "vue-router";
import homePage from "../views/MainPage.vue";
import loginPage from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: homePage,
  },
  {
    path: "/login",
    name: "login",
    component: loginPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
