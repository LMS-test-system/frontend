<template>
   
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-white uppercase bg-gray-500 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">I.F.O</th>
                    <th scope="col" class="px-6 py-3">Telegram profili</th>
                    <th scope="col" class="px-6 py-3">Telefon raqami</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="el in student" :key="el.id" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{el.full_name}}
                    </th>
                    <td class="px-6 py-4">
                        {{ el.telegram }}
                    </td>
                    <td class="px-6 py-4">
                        {{el.phone}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </template>
    
    <script setup>
      import { onMounted, ref } from "vue";
      import { studentService } from "../services/student";
      const student = ref([]);
    
      onMounted(() => {
        studentService.list().then((res)=>{
              student.value = res.data
          })
        })
    </script>
    
    <style lang="scss" scoped>
    
    </style>