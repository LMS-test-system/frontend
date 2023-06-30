import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TestView from "../views/TestView.vue";
// import SingleTestView from "../views/SingleTestView.vue";
import Dashboard from "../views/Dashboard.vue";
import Account from "../views/Account.vue";
import Login from "../views/Login.vue";
import Subject from "../views/Subject/Subject.vue";
import Teacher from "../views/Teacher/Teacher.vue";
import Student from "../views/Student/Student.vue";
import Group from "../views/Group/Group.vue";
import Result from "../views/Result/Result.vue";
import Test from "../views/Test/Test.vue";
import TestItem from "../views/Test/TestItem.vue";
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
          path: "/account",
          name: "account",
          component: Account,
        },
        {
          path: "/test",
          name: "test",
          component: Test,
        },
        {
          path: "/test/:id",
          name: "test-item",
          component: TestItem,
        },
        {
          path: "/teacher",
          name: "teacher",
          component: Teacher,
        },
        {
          path: "/student",
          name: "student",
          component: Student,
        },
        {
          path: "/group",
          name: "group",
          component: Group,
        },
        {
          path: "/subject",
          name: "subject",
          component: Subject,
        },
        {
          path: "/result",
          name: "result",
          component: Result,
        },
      ],


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
