import { createRouter, createWebHistory } from "vue-router";
import homePage from "../views/MainPage.vue";
import loginPage from "../views/Login.vue";
import registerPage from "../views/Register.vue";
import mainPage from "../views/AfterLogin.vue";
import CreateBlog from "../views/CreateBlog.vue";
import viewBlog from "../views/ViewBlog.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: homePage,
  },
  {
    path: "/users/:id",
    name: "users",
    component: mainPage,
  },
  {
    path: "/users/:id/blog/:blogid",
    name: "viewBlog",
    component: viewBlog,
  },
  {
    path: "/users/createBlog",
    name: "createBlog",
    component: CreateBlog,
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
