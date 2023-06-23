import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login/admin",
      name: "admin",
      component: Login,
    },
    {
      path: "/login/teacher",
      name: "teacher",
      component: Login,
    },
    {
      path: "/login/student",
      name: "student",
      component: Login,
    },
  ],
});

export default router;
