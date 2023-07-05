<template>
    <div class="p-3">
        <div class="flex justify-between items-center">
            <h2 class="uppercase dark:text-white text-gray-900 text-xl font-bold">{{ group.name }}</h2>
            <a @click="back" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-3">
                Orqaga qaytish
            </a>
        </div>
        <div class="flex justify-beetwen items-center gap-[50px] mt-14 mx-14">
            <img :src="`${api_url}/image/file/${group.image?.file_name}`" alt="Talaba rasmi" class="w-[320px] h-[320px] object-contain border">
            <div class="w-1/5 grid gap-6">
                <h1 class="text-4xl font-bold text-center text-blue-700">{{group?.name}}</h1>
                <div v-for="el in group.groupSubject" :key="el.id" class="mx-7 my-3">
                    <h1 class="text-2xl font-bold ">{{el?.subject?.name}}</h1>
                </div>
            </div>
        </div>
</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { groupService } from "../../services/group";

const router = useRouter();
const route = useRoute();
const group_id = route.params.id;
const group = ref([]);
const back = () => {
  router.go(-1);
};
onMounted(() => {
  groupService.getOne(group_id).then((res) => {
    group.value = res.data;
  });
});
</script>

<style lang="scss" scoped></style>
