<template>
  <TotalAll class="mt-10"/>
  <div class="w-full mt-14">
    <h1 class="text-xl my-5 ml-5">O'qituvchilar</h1>
    <TableTeacher/>
  </div>
  <div class="mt-10">
    <h1 class="text-xl my-5 ml-5">Talabalar</h1>
    <TableStudent/>
  </div>
</template>

<script setup>
import TotalAll from '../components/TotalAll.vue'
import TableTeacher from '../components/TableTeacher.vue'
import TableStudent from '../components/TableStudent.vue';
</script>

<style scoped></style>

