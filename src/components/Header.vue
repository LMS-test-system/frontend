<template>
  <div class="container mx-auto">
    <div
      class="h-[40px] lg:h-[65px] border-b border-[#DCDCDC] flex justify-between px-3"
    >
      <div class="flex justify-center items-center">
        <img
          class="h-[45px] hidden lg:block mr-3"
          src="../assets/icons/tatu.png"
          alt=""
        />
        <!-- <img class="h-[35px] hidden lg:block bg-blue-500 rounded-md pt-2" src="../assets/icons/Academy.svg" alt=""> -->
      </div>
      <div class="flex items-center text-[22px] text-gray-500 gap-4 relative">
        <i class="bx bxs-bell"></i>
        <i class="bx bxs-grid-alt"></i>
        <Avatar
          @click="toggleSettings"
          status="online"
          size="sm"
          rounded
          img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        />
        <div
          class="w-[225px] h-[250px] rounded-t-md absolute setting top-12 right-0 z-10"
          :class="isSettings ? '' : 'hidden'"
        >
          <div
            class="h-[30%] bg-white border rounded-t-md flex items-end justify-between pr-2 relative"
          >
            <Avatar
              status="online"
              size="lg"
              class="absolute top-10 left-[73px]"
              rounded
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            />
            <i
              class="bx bxs-edit-alt text-[18px] hover:bg-gray-200 p-1 rounded-full"
            ></i>
          </div>
          <div
            class="flex flex-col gap-1 pt-10 items-center justify-center text-black text-[14px]"
          >
            <p>Username</p>
            <p>user@mail.com</p>
            <div class="w-full flex flex-col gap-3 mt-2 px-3">
              <button @click="router.push({ name: 'account' })">
                <i class="bx bx-user mr-2 text-[20px]"></i>Manage My Account
              </button>
              <button @click="logout">
                <i class="bx bx-log-out mr-2 text-[20px]"></i>Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Avatar } from "flowbite-vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth/auth";

const router = useRouter();

const authStore = useAuthStore();

const user = ref("");

const isSettings = ref(false);

const toggleSettings = () => {
  isSettings.value = !isSettings.value;
};

const logout = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  localStorage.removeItem("staff_id");
  authStore.clear();
  router.push({ name: "login" });
};
</script>

<style scoped>
.setting {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(75px);
  border-radius: 4px;
}
</style>
