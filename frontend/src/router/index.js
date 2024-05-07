import { createRouter, createWebHistory } from "vue-router";
// import Navbar from "../views/MyNavbar.vue";

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: Navbar,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
