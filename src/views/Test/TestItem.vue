<template>
  <div>
    <SuperAdminTestItem
      v-if="
        authStore.getRole == 'super-admin' || authStore.getRole == 'teacher'
      "
    />
    <SingleTestView v-if="authStore.getRole == 'student'" />
  </div>
</template>

<script setup>
import SuperAdminTestItem from "../../components/SuperAdminTestItem.vue";
import SingleTestView from "../../components/SingleTestView.vue";
import { useAuthStore } from "../../stores/auth/auth";

const authStore = useAuthStore();
</script>

<style lang="scss" scoped></style>
