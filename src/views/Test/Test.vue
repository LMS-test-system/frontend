<template>
  <div>
    <SuperAdminTest v-if="authStore.getRole == 'super-admin'" />
    <StudentTest v-if="authStore.getRole == 'student'"/>

  </div>
</template>

<script setup>
import SuperAdminTest from "../../components/SuperAdminTest.vue";
import StudentTest from "../../components/StudentTest.vue";
import { useAuthStore } from "../../stores/auth/auth";

const authStore = useAuthStore();
</script>

<style lang="scss" scoped></style>
