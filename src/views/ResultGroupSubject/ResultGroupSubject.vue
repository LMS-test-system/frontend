<template>
  <div>
    <div class="grid grid-cols-4">
      <div v-for="(el, ind) in data.test" :key="ind">
        <router-link :to="`/result/group/subject/test/${el.id}`">
          <div class="max-w-xs rounded overflow-hidden shadow-lg m-4">
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
import { useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { subService } from "../../services/subject";

const route = useRoute();

const api_url = import.meta.env.VITE_API_BASE_URL;

const data = reactive({
  test: {},
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
  subService
    .getOne(route.params.id)
    .then((res) => {
      data.test = res.data?.test;
    })
    .catch((error) => {
      reportErr(error);
    });
});
</script>

<style lang="scss" scoped></style>
