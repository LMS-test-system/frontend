<script setup>
    import {ref, onMounted} from 'vue'
    import { navLinks } from '../constants/navlinks';
    import {useRouter} from "vue-router";

    const router = useRouter();
    const navlink = ref(navLinks)

    
</script>

<template>
    <div >
   
        <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
        <span class=""></span>
        <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
        </svg>
        </button>

        <aside
            id="default-sidebar"
            class="fixed top-0 lg:top-[65px] left-0 z-40 w-[200px] shadow h-screen transition-transform -translate-x-full sm:translate-x-0 bg-white"
            aria-label="Sidebar"
        >
        
        <div class="h-full pl-2 py-1 overflow-y-auto">
            <ul class="space-y-3 mr-2">
            <li v-for="link in navlink" :key="link.id" class="">
                <router-link 
                :to="link.link"
                class="flex items-center p-[6px] text-gray-600 bg-white hover:bg-[#F5F5F5] border rounded-md text-[14px]"
                >
                <i class="text-[22px]" :class="link.icon "></i>
                <span class="ml-3">{{link.title}}</span>
                </router-link>
            </li>
            </ul>
        </div>
        </aside>
  </div>
</template>

<style >
.router-link-exact-active{
  background-color: 		#F5F5F5;
}
</style>