<template>
  <div>
    <StudentResult v-if="authStore.getRole == 'student'" />
    <SuperAdminResult v-if="authStore.getRole == 'super-admin' || authStore.getRole == 'teacher'" />
  </div>
</template>

<script setup>
import StudentResult from "../../components/StudentResult.vue";
import SuperAdminResult from "../../components/SuperAdminResult.vue";
import { useAuthStore } from "../../stores/auth/auth";

const authStore = useAuthStore();
</script>

<style lang="scss" scoped></style>
