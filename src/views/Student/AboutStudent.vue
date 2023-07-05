<template>
    <div class="p-3">
        <div class="flex justify-between items-center">
            <h2 class="uppercase dark:text-white text-gray-900 text-2xl font-bold">{{student?.role?.name}}</h2>
            <a @click="back" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-3">
                Orqaga qaytish
            </a>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-3">
            <div class="flex justify-center gap-[50px] mt-14 mx-14">
                <img :src="`${api_url}/image/file/${student.image?.file_name}`" alt="Talaba rasmi" class="w-[320px] h-[320px] object-contain border">
                <div class="grid">
                    <h1 class="text-2xl font-bold text-blue-700">Talabaning I.F.O:<span class="ml-14 text-black text ">{{ student?.full_name }}</span></h1>
                    <h1 class="text-2xl font-bold text-blue-700">Mutahasissligi:<span class="ml-14 text-black text ">{{ student?.group?.name }}</span></h1>
                    <h1 class="text-2xl font-bold text-blue-700">Telefon raqami:<span class="ml-14 text-black text ">{{ student?.phone }}</span></h1>
                    <h1 class="text-2xl font-bold text-blue-700">Elektron manzili:<span class="ml-14 text-black text ">{{ student?.email }}</span></h1>
                    <h1 class="text-2xl font-bold text-blue-700">Telegram manzili:<a :href="student?.telegram" class="ml-14 text-black text ">{{ student?.telegram }}</a></h1>
                </div>
            </div>

        <!-- <pre>{{ student.result }}</pre> -->
        </div>

    </div>
    <div
      class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-3"
    >
      <pre>{{ student }}</pre>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { studentService } from "../../services/student";

const api_url = import.meta.env.VITE_API_BASE_URL;
const student_id = route.params.id
const student = ref([])
const back = ()=>{
    router.go(-1)
}

onMounted(() => {
  studentService.getOneFull(student_id).then((res) => {
    student.value = res.data;
  });
});
</script>

<style lang="scss" scoped></style>
