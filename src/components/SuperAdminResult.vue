<template>
  <div>
    <div class="grid grid-cols-4">
      <div v-for="(el, ind) in data.group" :key="ind">
        <router-link :to="`/result/group/${el.id}`">
          <div class="max-w-xs rounded overflow-hidden shadow-lg m-4">
            <img
              :src="`${api_url}/image/file/${el.image?.file_name}`"
              onerror="this.src='/no-image.png'"
              class="w-full object-cover h-40"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">{{ el.name }}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { ElNotification } from "element-plus";
import { groupService } from "../services/group";

const api_url = import.meta.env.VITE_API_BASE_URL;

const data = reactive({
  group: [],
});

const reportErr = (error) => {
  const message = error?.response?.data?.message;
  if (typeof message == "object") {
    for (let i in message) {
      setTimeout(() => {
        ElNotification({
          title: "Error",
          message: message[i],
          type: "warning",
        });
      }, i * 200);
    }
  } else {
    console.log(error);
    ElNotification({
      title: "Error",
      message: message,
      type: "warning",
    });
  }
};

onMounted(() => {
  groupService
    .getAll()
    .then((res) => {
      data.group = res.data;
    })
    .catch((error) => {
      reportErr(error);
    });
});
</script>

<style lang="scss" scoped></style>
