import { createRouter, createWebHistory } from "vue-router";
import homePage from "../views/MainPage.vue";
import loginPage from "../views/Login.vue";
import registerPage from "../views/Register.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: homePage,
  },
  {
    path: "/users/:id",
    name: "users",
    component: homePage,
  },
  {
    path: "/login",
    name: "login",
    component: loginPage,
  },
  {
    path: "/register",
    name: "register",
    component: registerPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
