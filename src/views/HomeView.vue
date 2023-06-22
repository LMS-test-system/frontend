<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { Avatar } from 'flowbite-vue'
</script>

<template>
  <main>
    <p class="text-red-300">Hello</p>
      <el-button type="info">Info</el-button>
      <el-button type="success">Success</el-button>
      <i class='bx bx-user'></i>
      <Avatar status="online" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
  </main>
</template>
