<template>
    <div class="w-full flex flex-col  gap-y-5 lg:flex lg:flex-row items-center justify-between">
      <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-gray-500 w-full lg:w-[23%] cursor-pointer">
        <div class="p-4 flex items-center">
          <div class="w-12 h-12 p-3 rounded-full bg-red-600 mr-4">
            <i class="bx bx-user-pin text-white text-[25px] flex items-center justify-center"></i>
          </div>
          <div>
            <p class="mb-2 text-lg font-medium text-white">O'qituvchilar</p>
            <p class="text-2xl font-bold text-white">{{teacher.length}}</p>
          </div>
        </div>
      </div>
  
      <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-gray-500 w-full lg:w-[23%] cursor-pointer">
        <div class="p-4 flex items-center">
          <div
            class="w-12 h-12 p-3 rounded-full bg-yellow-300 mr-4"
          >
            <i
              class="bx bxs-graduation text-white text-[23px] flex items-center justify-center"
            ></i>
          </div>
          <div>
            <p class="mb-2 text-lg font-medium text-white">
              Talabalar
            </p>
            <p class="text-2xl font-bold text-white">{{student.length}}</p>
          </div>
        </div>
      </div>
  
      <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-gray-500 w-full lg:w-[23%] cursor-pointer">
        <div class="p-4 flex items-center">
          <div
            class="w-12 h-12 p-3 rounded-full bg-green-500 mr-4"
          >
          <i class='bx bx-group text-white text-[25px] flex items-center justify-center'></i>
          </div>
          <div>
            <p class="mb-2 text-lg font-medium text-white">
              Guruhlar
            </p>
            <p class="text-2xl font-bold text-white">{{group.length}}</p>
          </div>
        </div>
      </div>
      <div class="min-w-0 rounded-lg shadow-xs overflow-hidden bg-gray-500 w-full lg:w-[23%] cursor-pointer">
        <div class="p-4 flex items-center">
          <div
            class="w-12 h-12 p-3 rounded-full bg-blue-500 mr-4"
          >
          <i class='bx bxs-book-alt text-white text-[25px] flex items-center justify-center'></i>
          </div>
          <div>
            <p class="mb-2 text-lg font-medium text-white">
              Fanlar
            </p>
            <p class="text-2xl font-bold text-white">{{science.length}}</p>
          </div>
        </div>
      </div>
    </div>
  
      <!-- <pre>{{ student }}</pre> -->
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import { teacherService } from "../services/teacher";
  import { studentService } from "../services/student";
  import { groupService } from "../services/group";
  import { useScience } from "../services/science";
  
  const teacher = ref([]);
  const student = ref([]);
  const group = ref([]);
  const science = ref([]);
  
  onMounted(() => {
      teacherService.list().then((res)=>{
          teacher.value = res.data
      })
  
      studentService.list().then((res)=>{
        student.value = res.data
      })
  
      groupService.getAll().then((res)=>{
        group.value = res.data
      })
  
      useScience.list().then((res)=>{
        science.value = res.data
      })
    })
  </script>
  
  <style scoped></style>
  
  