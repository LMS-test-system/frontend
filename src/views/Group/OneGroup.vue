<template>
    <div class="p-3">
        <div class="flex justify-between items-center">
            <h2 class="uppercase dark:text-white text-gray-900 text-xl font-bold">{{ group.name }}</h2>
            <a @click="back" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-3">
                Orqaga qaytish
            </a>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 py-3">
            <pre>{{ group }}</pre>
        </div>
    </div>

</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import { groupService } from '../../services/group';
// import router from '../../router';

const router = useRouter()
const route = useRoute()
const group_id = route.params.id
const group = ref([])
const back = ()=>{
    router.go(-1)
}
onMounted(() => {
    groupService.getOne(group_id).then((res)=>{
        group.value = res.data
    })

   
})

</script>

<style lang="scss" scoped>

</style>