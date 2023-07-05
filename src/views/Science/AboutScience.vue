<template>
    <div class="p-3">
        <div class="flex justify-between items-center">
            <h2 class="uppercase dark:text-white text-gray-900 text-xl font-bold">{{ subject.name }}</h2>
            <a @click="back" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-3">
                Orqaga qaytish
            </a>
        </div>

        <div class="flex justify-beetwen gap-[50px] mt-14 mx-14">
            <img :src="`${api_url}/image/file/${subject.image?.file_name}`" alt="Talaba rasmi" class="w-[320px] h-[320px] object-contain border">
            <div class="w-1/2 grid">
                <h1 class="text-2xl font-bold text-blue-700">{{subject?.name}}</h1>
                <p class="text-justify ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, mollitia cupiditate, quis consequatur odio atque, rem magnam natus vero tempora est nihil suscipit distinctio deserunt! Nam accusantium cupiditate commodi dolores ipsum quod distinctio tempora ex suscipit quidem repudiandae iusto laborum atque eum iure unde, veniam consequatur sit laudantium. Quibusdam quasi cupiditate dolore sequi voluptatum, quaerat ipsam unde ipsum commodi ex repudiandae est blanditiis, aliquid, ab dicta mollitia explicabo dolorem et ratione error officia velit rerum totam cumque! Sequi fugit suscipit, corrupti reiciendis nobis incidunt vitae dolores, illum sed fugiat voluptatibus perspiciatis rerum quae molestiae? Mollitia architecto labore fuga similique dolor.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useScience } from "../../services/science";
// import router from '../../router';

const router = useRouter();
const route = useRoute();
const subject_id = route.params.id;
const subject = ref([]);
const back = () => {
  router.go(-1);
};
onMounted(() => {
  useScience.getOne(subject_id).then((res) => {
    subject.value = res.data;
  });
});
</script>

<style lang="scss" scoped></style>
