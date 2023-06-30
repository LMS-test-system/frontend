<template>
  <div>
    <SuperAdminTestItem v-if="authStore.getRole == 'super-admin'" />
  </div>
</template>

<script setup>
import SuperAdminTestItem from "../../components/SuperAdminTestItem.vue";
import { useAuthStore } from "../../stores/auth/auth";

const authStore = useAuthStore();
</script>

<style lang="scss" scoped></style>
