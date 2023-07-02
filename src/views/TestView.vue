<template>
    <div>
        <StudentTest v-if="role == 'student'"/>
        
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import StudentTest from '../components/StudentTest.vue'
const role = ref('')

onMounted(()=>{
    role.value = localStorage.getItem("role");
    console.log(role.value);
})

 
</script>

<style lang="scss" scoped>

</style>