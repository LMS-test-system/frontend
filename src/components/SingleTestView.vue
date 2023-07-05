<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between">
      <h2 class="text-[20px] mb-2">{{ test.name }}</h2>
      <div class="flex flex-col items-center justify-center gap-2">
        <div class="flex gap-0">
          <p
            class="bg-black text-white rounded-l-md w-10 h-8 flex items-center justify-center text-[22px]"
          >
            {{ min }}
          </p>
          <p class="text-[20px] font-bold bg-black text-white">:</p>
          <p
            class="bg-black text-white px-2 py-1 rounded-r-md w-10 h-8 flex items-center justify-center text-[22px]"
          >
            {{ sec }}
          </p>
        </div>
        <button
          @click="finishTest"
          class="bg-green-400 px-3 py-1 rounded-full border border-black focus:ring-2"
        >
          Testni yakunlash
        </button>
      </div>
    </div>
    <div class="relative">
      <div class="flex items-center justify-between">
        <p>Savollar:</p>
      </div>
      <div class="">
        <button
          v-for="(el, index) in result"
          :key="el.id"
          @click="selectQuestion(index)"
          class="my-2 px-3 border rounded-md py-1 hover:bg-green-300 ml-1 focus:bg-blue-300"
          :class="
            el.answer_id && questionIndex == index
              ? 'bg-blue-300'
              : questionIndex == index
              ? 'bg-blue-300'
              : el.answer_id || el?.answer?.length
              ? 'bg-green-300'
              : ''
          "
        >
          {{ index + 1 }}
        </button>
      </div>
      <div class="bg-white rounded-md w-full p-3 absolute top-32">
        <div
          v-for="(el, index) in test.question"
          :key="el.id"
          :class="index == questionIndex ? 'block z-20' : 'hidden'"
        >
          <p class="p-3 text-[18px]">{{ el.question }}</p>
          <hr />
          <div
            v-for="ans in el.answer"
            class="flex items-center justify-start gap-2 mt-2"
          >
            <input
              :type="el.is_multiple_answer ? 'checkbox' : 'radio'"
              :name="index"
              :value="ans.id"
              @change="setAnswer($event, index, el.is_multiple_answer)"
              class="mt-2.5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />

            {{ ans.answer }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount } from "vue";
import { useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
import { ElNotification, ElMessage, ElMessageBox } from "element-plus";
import { testService } from "../services/test";
import { resultService } from "../services/result";
import { useAuthStore } from "../stores/auth/auth";
import { reportErr } from "../constants/report";

const router = useRouter();
const route = useRoute();

const authStore = useAuthStore();

const time_limit = ref(0);
const min = ref(0);
const sec = ref(0);
let timer = null;

const questionIndex = ref(0);

const test_id = route.params.id;

const test = ref([]);
const result = ref([]);

const check = ref(false);

const selectQuestion = (index) => {
  questionIndex.value = index;
};

const setAnswer = (event, index, is_multiple_answer) => {
  event.preventDefault();
  if (is_multiple_answer) {
    if (event.target.checked) {
      result.value[index].answer.push(event.target.value);
    } else {
      result.value[index].answer.forEach((el, ind) => {
        if (el == event.target.value) result.value[index].answer.splice(ind, 1);
      });
    }
  } else {
    result.value[index].answer_id = event.target.value;
  }
};

const parseSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return { minutes, seconds: remainingSeconds };
};

onMounted(() => {
  check.value = true;
  startTest();
});

const startTest = () => {
  testService
    .getOne(test_id)
    .then((res) => {
      time_limit.value = res.data.time_limit * 60;
      // time_limit.value = '10';
      test.value = res.data;
      res.data.question.forEach((item) => {
        result.value.push(
          item.is_multiple_answer
            ? {
                question_id: item.id,
                is_multiple_answer: item.is_multiple_answer,
                answer: [],
              }
            : {
                question_id: item.id,
                is_multiple_answer: item.is_multiple_answer,
                answer_id: null,
              }
        );
      });
      startTimer();
    })
    .catch((error) => {
      reportErr(error);
    });
};

const startTimer = () => {
  timer = setInterval(() => {
    time_limit.value--;
    const { minutes, seconds } = parseSeconds(time_limit.value);
    min.value = String(minutes).padStart(2, "0");
    sec.value = String(seconds).padStart(2, "0");
    if (time_limit.value == 0) {
      clearInterval(timer);
      ElNotification({
        title: "Your time is up",
        type: "warning",
      });

      finishTest();
    }
  }, 1000);
};

const finishTest = () => {
  router.push("/result");
};

onBeforeRouteLeave(async (to, from, next) => {
  if (time_limit.value == 0) {
    await submitAnswers();
    next();
  } else {
    const answer = window.confirm(
      "Test tugatiladi va javoblar qabul qilinadi, davom ettirishni hohlaysizmi?"
    );
    if (!answer) {
      next(false);
    } else {
      await submitAnswers();
      next();
    }
  }
});

const submitAnswers = async () => {
  if (check.value) {
    const time_spent =
      test.value.time_limit - Math.ceil(+time_limit.value / 60);
    const student_id = authStore.getStaffId;
    const results_with_answer = result.value;

    try {
      const resultBackend = await resultService.create({
        student_id,
        time_spent,
        test_id,
      });

      for (let i = 0; i < results_with_answer.length; i++) {
        const result_question = await resultService.createResultQuestion({
          is_right: true,
          question_id: result.value[i].question_id,
          result_id: resultBackend.data.id,
        });
        if (result.value[i].is_multiple_answer) {
          if (result.value[i].answer.length) {
            for (let j in result.value[i].answer) {
              await resultService.createResultAnswer({
                answer_id: results_with_answer[i].answer[j],
                result_question_id: result_question.data.id,
              });
            }
          } else {
            await resultService.createResultAnswer({
              answer_id: null,
              result_question_id: result_question.data.id,
            });
          }
        } else {
          await resultService.createResultAnswer({
            answer_id: results_with_answer[i].answer_id,
            result_question_id: result_question.data.id,
          });
        }
      }

      await resultService.calculateResult(resultBackend.data.id);

      ElNotification({
        title: "Test submited",
        type: "success",
      });
    } catch (error) {
      reportErr(error);
    }
  }

  clearInterval(timer);
};
</script>

<style lang="scss" scoped></style>
