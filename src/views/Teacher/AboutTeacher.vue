<template>
    <div class="p-3">
        <div class="flex justify-between items-center">
            <h2 class="uppercase dark:text-white text-gray-900 text-2xl font-bold">{{teacher?.role?.name}}</h2>
            <a @click="back" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-3">
                Orqaga qaytish
            </a>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-3">
            <div class="flex justify-center gap-[50px] mt-14 mx-14">
                <img :src="`${api_url}/image/file/${teacher.image?.file_name}`" alt="Talaba rasmi" class="w-[320px] h-[320px] object-contain border">
                <div class="grid">
                    <h1 class="text-2xl font-bold text-blue-700">Talabaning I.F.O:<span class="ml-14 text-black text ">{{ teacher?.full_name }}</span></h1>
                    <h1 class="text-2xl font-bold text-blue-700">Telefon raqami:<span class="ml-14 text-black text ">{{ teacher?.phone }}</span></h1>
                    <h1 class="text-2xl font-bold text-blue-700">Elektron manzili:<span class="ml-14 text-black text ">{{ teacher?.email }}</span></h1>
                    <h1 class="text-2xl font-bold text-blue-700">Telegram manzili:<a :href="teacher?.telegram" class="ml-14 text-black text ">{{ teacher?.telegram }}</a></h1>
                </div>
            </div>

        <!-- <pre>{{ teacher.result }}</pre> -->
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import { teacherService } from '../../services/teacher';

const router = useRouter()
const route = useRoute()

const api_url = import.meta.env.VITE_API_BASE_URL;
const teacher_id = route.params.id
const teacher = ref([])
const back = ()=>{
    router.go(-1)
}
onMounted(() => {
    teacherService.getOne(teacher_id).then((res)=>{
        teacher.value = res.data
    })

   
})
</script>

<style lang="scss" scoped>

</style>