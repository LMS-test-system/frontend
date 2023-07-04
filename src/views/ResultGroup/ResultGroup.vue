<template>
  <div>
    <div class="grid grid-cols-4">
      <div v-for="(el, ind) in data.group?.groupSubject" :key="ind">
        <router-link :to="`/result/group/subject/${el.subject_id}`">
          <div class="max-w-xs rounded overflow-hidden shadow-lg m-4">
            <img
              :src="`${api_url}/image/file/${el.subject?.image?.file_name}`"
              onerror="this.src='/no-image.png'"
              class="w-full object-cover h-40"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">{{ el.subject?.name }}</div>
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
import { groupService } from "../../services/group";
import { reportErr } from "../../constants/report";

const route = useRoute();

const api_url = import.meta.env.VITE_API_BASE_URL;

const data = reactive({
  group: {},
});


onMounted(() => {
  localStorage.setItem("group_id", route.params.id);

  groupService
    .getOne(route.params.id)
    .then((res) => {
      data.group = res.data;
    })
    .catch((error) => {
      reportErr(error);
    });
});
</script>

<style lang="scss" scoped></style>
