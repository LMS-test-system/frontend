<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<Header/>
  <main>
    <section id="main" class="w-full">
      <Sidebar/>
      <div class="sm:ml-[200px] bg-[#F8F8F8] p-3">
        <div
          class=" border-gray-200 border-dashed rounded-lg dark:border-gray-700 p-3 border border-dashed border-[#BEBEBE]"
        >
        <RouterView/>
        </div>
      </div>
    </section>
  </main>
</template>
