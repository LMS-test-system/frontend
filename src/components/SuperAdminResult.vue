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
import { reportErr } from "../constants/report";

const api_url = "http://16.171.11.243/api";

const data = reactive({
  group: [],
});

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
