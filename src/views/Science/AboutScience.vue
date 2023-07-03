<template>
  <div class="p-3">
    <div class="flex justify-between items-center">
      <h2 class="uppercase dark:text-white text-gray-900 text-xl font-bold">
        {{ subject.name }}
      </h2>
      <a
        @click="back"
        class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-3"
      >
        Orqaga qaytish
      </a>
    </div>
    <div
      class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-3"
    >
      <pre>{{ subject }}</pre>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useScience } from "../../services/science";
// import router from '../../router';

const router = useRouter();
const route = useRoute();
const subject_id = route.params.id;
const subject = ref([]);
const back = () => {
  router.go(-1);
};
onMounted(() => {
  useScience.getOne(subject_id).then((res) => {
    subject.value = res.data;
  });
});
</script>

<style lang="scss" scoped></style>
