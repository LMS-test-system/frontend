<template>
  <div class="flex items-center justify-center h-screen">
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
</template>

<script setup>
import axios from "axios";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElNotification } from "element-plus";

const router = useRouter();
const route = useRoute();

const data = reactive({
  login: "",
  password: "",
});

const login = () => {
  const user = {
    login: data.login,
    password: data.password,
  };

  const staff = route.path.split("/")[2];

  axios
    .post(`http://localhost:3001/api/${staff}/auth/signin`, user)
    .then((res) => {
      ElNotification({
        title: "Signed in",
        type: "success",
      });
      data.login = "";
      data.password = "";
      localStorage.setItem("token", res?.data?.token);
      if (staff == "admin") {
        localStorage.setItem("role", res?.data?.admin?.role?.name);
      } else {
        localStorage.setItem("role", staff);
      }
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
</script>

<style lang="scss" scoped></style>
