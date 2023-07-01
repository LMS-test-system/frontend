<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
 <header class="fixed w-full bg-white z-20">
   <Header />
 </header>
  <main>

    <section id="main" class="w-full pt-[65px]">
      <Sidebar />
      <div class="sm:ml-[200px] bg-[#F8F8F8] p-3">
        <div
          class="rounded-lg dark:border-gray-700 p-3 border border-dashed border-[#BEBEBE] min-h-screen"

        >
          <RouterView />
        </div>
      </div>
    </section>
  </main>
</template>
