import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TestView from "../views/TestView.vue";
// import SingleTestView from "../views/SingleTestView.vue";
import Dashboard from "../views/Dashboard.vue";
import Account from "../views/Account.vue";
import Login from "../views/Login.vue";
import Group from "../views/Group/Group.vue";
import ResultGroup from "../views/ResultGroup/ResultGroup.vue";
import ResultGroupSubject from "../views/ResultGroupSubject/ResultGroupSubject.vue";
import ResultGroupSubjectTest from "../views/ResultGroupSubjectTest/ResultGroupSubjectTest.vue";
import Result from "../views/Result/Result.vue";
import Test from "../views/Test/Test.vue";
import TestItem from "../views/Test/TestItem.vue";
import { useAuthStore } from "../stores/auth/auth";
import { ElNotification, ElMessage, ElMessageBox } from "element-plus";

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
          component: () => import("../views/Teacher/Teacher.vue"),
        },
        {
          path: "/about_teacher",
          name: "aboutteacher",
          component: () => import("../views/Teacher/AboutTeacher.vue"),
        },
        {
          path: "/student",
          name: "student",
          component: () => import("../views/Student/Student.vue"),
        },
        {
          path: "/about_student",
          name: "aboutstudent",
          component: () => import("../views/Student/AboutStudent.vue"),
        },
        {
          path: "/subject",
          name: "subject",
          component: () => import("../views/Science/Science.vue"),
        },
        {
          path: "/about_subject",
          name: "aboutsubject",
          component: () => import("../views/Science/AboutScience.vue"),
        },
        {
          path: "/group",
          name: "group",
          component: Group,
        },

        {
          path: "/result",
          name: "result",
          component: Result,
        },
        {
          path: "/result/group/:id",
          name: "result-group-id",
          component: ResultGroup,
        },
        {
          path: "/result/group/subject/:id",
          name: "result-group-subject-id",
          component: ResultGroupSubject,
        },
        {
          path: "/result/group/subject/test/:id",
          name: "result-group-subject-test-id",
          component: ResultGroupSubjectTest,
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
  //   if(from.name == 'test-item'){

  //     ElMessageBox.confirm(
  //         'Test tugatiladi va javoblar qabul qilinadi, davom ettirishni hohlaysizmi?',
  //         'Warning',
  //     {
  //     confirmButtonText: 'OK',
  //     cancelButtonText: 'Cancel',
  //     type: 'warning',
  //     center: true,
  //     }
  //     )
  //     .then(() => {
  //         submitAnswers().then(()=>{
  //             next()
  //         })
  //     })
  //     .catch(() => {

  //     })
  // }
  // else{
  //     next()
  // }
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
