<template>
  <div class="container mx-auto">
    <div
      v-if="user"
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
        <button
          @click="toggleSettings"
          class="dropdown w-8 h-8 rounded-full overflow-hidden"
        >
          <img
            :src="generateURL(user.image?.file_name)"
            onerror="this.src='/no-avatar.png'"
            class="w-full object-cover dropdown"
          />
        </button>
        <div
          :class="
            isSettings
              ? 'w-[225px] h-[260px] rounded-t-md absolute setting top-12 right-0 z-10'
              : 'hidden'
          "
        >
          <div
            class="h-[70px] bg-white border rounded-t-md flex items-end justify-between pr-2 relative"
          >
            <div
              class="absolute top-10 left-[73px] w-[80px] h-[80px] rounded-full overflow-hidden"
            >
              <img
                :src="generateURL(user.image?.file_name)"
                onerror="this.src='/no-avatar.png'"
                class="w-full object-cover dropdown"
              />
            </div>
          </div>
          <div
            class="flex flex-col gap-1 pt-10 items-center justify-center text-black text-[14px]"
          >
            <p class="mt-4 text-base">{{ user.full_name }}</p>
            <p class="text-xs text-slate-700">{{ user.email }}</p>
            <div class="w-full flex flex-col gap-3 mt-2 px-3">
              <button
                @click="
                  router.push({ name: 'account', params: { id: user.id } })
                "
              >
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
import { ref, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth/auth";
import { authService } from "../services/auth";

const api_url = import.meta.env.VITE_API_BASE_URL;
const router = useRouter();

const authStore = useAuthStore();

const user = ref(null);
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

const generateURL = (file_name) => {
  const url = `${api_url}/image/file/${file_name}`;
  return url;
};

onBeforeMount(() => {
  const role = localStorage.getItem("login_role");
  const staff_id = localStorage.getItem("staff_id");
  authService.getOneInfo(staff_id, role).then((res) => {
    user.value = res.data;
  });
});

onMounted(() => {
  window.addEventListener("click", (event) => {
    if (!event.target.matches(".dropdown")) {
      isSettings.value = false;
    }
  });
});
</script>

<style scoped>
.setting {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(75px);
  border-radius: 4px;
}
</style>
