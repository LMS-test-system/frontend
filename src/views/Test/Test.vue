<template>
  <div>
    <SuperAdminTest v-if="authStore.getRole == 'super-admin'" />
  </div>
</template>

<script setup>
import SuperAdminTest from "../../components/SuperAdminTest.vue";
import { useAuthStore } from "../../stores/auth/auth";

const authStore = useAuthStore();
</script>

<style lang="scss" scoped></style>
