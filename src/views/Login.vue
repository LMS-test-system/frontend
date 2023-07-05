<template>
  <div class="h-screen">
    <div class="flex items-center justify-end p-5">
      <select
        ref="role"
        name="role"
        id="role"
        class="p-3 my-2 border border-[#00000033] rounded-md focus:outline-none"
      >
        <option value="admin" selected>Admin</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
      </select>
    </div>

    <div class="flex items-center justify-center h-[75%]">
      <div class="w-[430px] p-5 rounded-lg">
        <form @submit.prevent="login">
          <h1 class="font-bold text-[30px] leading-[28px] mb-5">Log in</h1>

          <input
            v-model="data.login"
            type="text"
            name="login"
            id="login"
            placeholder="Login"
            class="w-full p-3 my-2 border border-[#00000033] rounded-md focus:outline-none"
            required
          />

          <input
            v-model="data.password"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            class="w-full p-3 my-2 border border-[#00000033] rounded-md focus:outline-none"
            required
          />

          <button
            type="submit"
            class="w-full p-4 my-5 flex items-center justify-center text-white font-bold text-[14px] leading-[18px] bg-[#1DA1F2] rounded-full"
          >
            <span>Log in</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { authService } from "../services/auth";
import {useAuthStore} from '../stores/auth/auth'
const router = useRouter();
const route = useRoute();
const store = useAuthStore()
const role = ref();

const data = reactive({
  login: "",
  password: "",
});

const login = () => {
  const user = {
    login: data.login,
    password: data.password,
  };

  authService
    .login(user, role.value.value)
    .then((res) => {
      // store.setUser(res.data.staff)
      ElNotification({
        title: "Signed in",
        type: "success",
      });

      data.login = "";
      data.password = "";

      localStorage.setItem("token", res.data?.token);
      localStorage.setItem("role", res.data?.staff?.role?.name);
      localStorage.setItem("staff_id", res.data?.staff?.id);

      // if (role.value.value == "admin") {
      //   localStorage.setItem("role", res?.data?.admin?.role?.name);
      // } else {
      //   localStorage.setItem("role", role.value.value);
      // }


      router.push({ name: "home" });
    })
    .catch((error) => {
      const message = error?.response?.data?.message;
      if (typeof message == "object") {
        for (let i of message) {
          ElNotification({
            title: "Error",
            message: i,
            type: "warning",
          });
        }
      } else {
        ElNotification({
          title: "Error",
          message: message,
          type: "warning",
        });
      }
    });
};

onMounted(() => {
  const select = document.getElementById("role");

  const login_role = localStorage.getItem("login_role");

  select.addEventListener("change", (e) => {
    localStorage.setItem("login_role", e.target.value);
  });

  if (login_role) {
    select.value = login_role;
  } else {
    localStorage.setItem("login_role", select.value);
  }
});
</script>

<style lang="scss" scoped></style>
