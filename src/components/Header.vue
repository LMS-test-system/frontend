<template>
    <div class="container mx-auto ">
        <div class="h-[65px] border-b border-[#DCDCDC] flex justify-between px-3" >
            <div class="flex justify-center items-center mt-3">
                <img class="h-[39px] mr-3" src="../assets/icons/logo.svg" alt="">
                <img class="h-[35px] bg-blue-500 rounded-md pt-2" src="../assets/icons/Academy.svg" alt="">
            </div>
            <div class="flex  items-center text-[22px] text-gray-500 gap-4">
                <i class='bx bxs-bell'></i>
                <i class='bx bxs-grid-alt'></i>
                 <Avatar status="online" size="sm" rounded img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" />
            </div>
        </div>

    </div>
</template>

<script setup>
import { Avatar } from 'flowbite-vue'
</script>

<style  scoped>

</style>