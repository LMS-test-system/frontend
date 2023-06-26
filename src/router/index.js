import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TestView from "../views/TestView.vue";
import SingleTestView from "../views/SingleTestView.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import { useAuthStore } from "../stores/auth/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
        },
        {
          path: "/tests",
          name: "tests",
          component: TestView,
        },
        {
          path: "/tests/:id",
          name: "singleTest",
          component: SingleTestView,
        },
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
  let staff_id = store.getStaffId;
  if (!token) {
    token = localStorage.getItem("token");
    store.setToken(token);
  }
  if (!role) {
    role = localStorage.getItem("role");
    store.setRole(role);
  }
  if (!staff_id) {
    staff_id = localStorage.getItem("staff_id");
    store.setStaffId(staff_id);
  }
  if (to.name !== "login" && !token) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
