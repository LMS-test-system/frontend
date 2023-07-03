<template>
  <div v-if="data.test">
    <div class="rounded overflow-hidden shadow-lg m-4">
      <div class="px-6 py-4 flex justify-between">
        <div class="font-bold text-xl mb-2">{{ data.test.name }}</div>
        <p class="text-[#007bff]">
          {{ data.test.result.length }} / {{ data.group.student.length }}
        </p>
      </div>
    </div>

    <div class="">
      <div v-for="(el, ind) in data.test.result" :key="ind">
        <div class="rounded overflow-hidden shadow-lg m-4">
          <div class="px-6 py-4 flex justify-between">
            <div class="font-bold text-xl mb-2">{{ el.student.full_name }}</div>
            <p class="text-[#007bff]">Score: {{ getScore(el) }}%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { testService } from "../../services/test";

const route = useRoute();

const api_url = import.meta.env.VITE_API_BASE_URL;

const data = reactive({
  test: null,
  group_id: null,
  group: null,
});

function getScore(result) {
  const totalQuestions = result.resultQuestion.length;
  const correctAnswers = result.resultQuestion.filter(
    (question) => question.is_right
  ).length;
  const score = (correctAnswers / totalQuestions) * 100;
  return score.toFixed(0);
}

const reportErr = (error) => {
  const message = error?.response?.data?.message;
  if (typeof message == "object") {
    for (let i in message) {
      setTimeout(() => {
        ElNotification({
          title: "Error",
          message: message[i],
          type: "warning",
        });
      }, i * 200);
    }
  } else {
    console.log(error);
    ElNotification({
      title: "Error",
      message: message,
      type: "warning",
    });
  }
};

onMounted(() => {
  data.group_id = localStorage.getItem("group_id");

  testService
    .getOne(route.params.id)
    .then((res) => {
      data.test = res.data;
      data.group = res.data.subject?.groupSubject.find(
        (el) => el.group.id == data.group_id
      ).group;
    })
    .catch((error) => {
      reportErr(error);
    });
});
</script>

<style lang="scss" scoped></style>
