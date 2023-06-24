import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import { useAuthStore } from "../stores/auth/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: '/client',
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "/",
          name: "dashboard",
          component: Dashboard,
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  let token = store.getToken;
  let role = store.getRole;
  if (!token) {
    token = localStorage.getItem("token");
    store.setToken(token);
  }
  if (!role) {
    role = localStorage.getItem("role");
    store.setRole(role);
  }
  if (to.name !== "login" && !token) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
