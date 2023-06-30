<template>
  <div v-if="data.item">
    <div class="flex justify-between p-2 2xl:p-5">
      <h1 class="2xl:text-2xl font-bold w-52 2xl:w-72">{{ data.item.name }}</h1>

      <div class="flex gap-1 2xl:gap-3 items-center w-48">
        <img
          class="w-4 h-4 2xl:w-7 2xl:h-7 object-cover rounded-full"
          :src="`${api_url}/image/file/${data.item.subject.image?.file_name}`"
          onerror="this.src='/no-image.png'"
          alt=""
        />

        <h2>{{ data.item.subject.name }}</h2>
      </div>

      <div class="flex items-center justify-between w-36 2xl:w-48">
        <h2 class="flex gap-1">
          {{ data.item.type }} <span class="2xl:block hidden">questions</span
          ><span class="2xl:hidden block">q</span>
        </h2>

        <h2 class="flex gap-1">
          {{ data.item.time_limit }} <span class="2xl:block hidden">min</span
          ><span class="2xl:hidden block">m</span>
        </h2>
      </div>
    </div>

    <!-- Modal toggle -->
    <div class="my-2 2xl:my-5 p-2 2xl:p-5 flex justify-between">
      <button
        @click="showModal"
        type="button"
        class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add question
      </button>

      <button
        @click="updateList"
        class="w-10 h-10 text-2xl rounded-full hover:bg-slate-100 hover:text-green-600 flex items-center justify-center"
      >
        <i class="bx bx-refresh"></i>
      </button>
    </div>
    <!-- Modal toggle -->

    <div class="p-5">
      <div v-for="(el, ind) in data.item.question" :key="ind">
        <div class="flex justify-between">
          <h3>{{ el.question }}</h3>

          <h2>
            {{ el.is_multiple_answer ? "multiple choice" : "single choice" }}
          </h2>

          <div class="flex justify-between w-32">
            <button
              @click="editItem(el.id)"
              class="w-10 h-10 text-2xl rounded-full hover:bg-slate-100 hover:text-blue-600 flex items-center justify-center"
            >
              <i class="bx bx-edit"></i>
            </button>

            <button
              @click="deleteItem(el.id)"
              class="w-10 h-10 text-2xl rounded-full hover:bg-slate-100 hover:text-red-600 flex items-center justify-center"
            >
              <i class="bx bx-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <form @submit.prevent="submit" v-if="isShowModal">
    <Modal @close="data.is_edit ? clear() : closeModal()">
      <template #header>
        <div class="flex items-center text-lg">New question</div>
      </template>
      <template #body>
        <div class="mb-6 px-5">
          <label
            for="question"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Question
          </label>
          <input
            v-model="data.question"
            type="text"
            id="question"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter question"
            required
          />
        </div>

        <div class="mb-6 px-5 flex items-center gap-10">
          <div class="flex items-center">
            <input
              v-model="data.is_multiple_answer"
              :value="false"
              id="is_multiple_answer_1"
              type="radio"
              name="is_multiple_answer"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              @change="data.answer.forEach((el) => (el.is_right = false))"
            />
            <label
              for="is_multiple_answer_1"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Single choice</label
            >
          </div>

          <div class="flex items-center">
            <input
              v-model="data.is_multiple_answer"
              :value="true"
              id="is_multiple_answer_2"
              type="radio"
              name="is_multiple_answer"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="is_multiple_answer_2"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Multiple choice</label
            >
          </div>
        </div>

        <div class="my-10 px-5">
          <div v-for="(el, ind) in data.answer" :key="ind">
            <div class="mb-6 flex gap-5">
              <input
                @click="
                  data.is_multiple_answer
                    ? null
                    : data.answer.forEach((el) => (el.is_right = false))
                "
                v-model="el.is_right"
                :value="true"
                :type="data.is_multiple_answer ? 'checkbox' : 'radio'"
                name="is_right"
                class="mt-2.5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                @change="(e) => (el.is_right = e.target.checked)"
              />

              <textarea
                v-model="el.answer"
                id="message"
                rows="1"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Answer"
                required
              ></textarea>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-between">
          <button
            @click="clear"
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </template>
    </Modal>
  </form>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessageBox, ElNotification } from "element-plus";
import { Modal } from "flowbite-vue";
import { testService } from "../services/test";
import { questionService } from "../services/question";
import { answerService } from "../services/answer";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const api_url = import.meta.env.VITE_API_BASE_URL;

const isShowModal = ref(false);
function closeModal() {
  isShowModal.value = false;
}
function showModal() {
  isShowModal.value = true;
}

const data = reactive({
  question: null,
  is_multiple_answer: false,
  test_id: null,
  item: null,
  is_edit: false,
  question_id: null,
  answer: [
    { id: null, answer: null, is_right: false },
    { id: null, answer: null, is_right: false },
    { id: null, answer: null, is_right: false },
    { id: null, answer: null, is_right: false },
  ],
});

const clear = () => {
  data.question = null;
  data.is_multiple_answer = false;
  data.is_edit = false;
  data.question_id = null;
  data.answer.forEach((el) => {
    el.id = null;
    el.answer = null;
    el.is_right = false;
  });
  
  closeModal();
};

const updateList = () => {
  testService
    .getOne(route.params.id)
    .then((res) => {
      data.item = res.data;
      data.test_id = res.data.id;
    })
    .catch((error) => {
      reportErr(error);
    });
};

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
    ElNotification({
      title: "Error",
      message: message,
      type: "warning",
    });
  }
};

const submit = () => {
  const item = {
    question: data.question,
    is_multiple_answer: data.is_multiple_answer,
    test_id: data.test_id,
  };

  if (!data.is_edit) {
    questionService
      .create(item)
      .then((res) => {
        createAllAnswer(res.data.id);

        clear();

        updateList();

        ElNotification({
          title: "Added",
          type: "success",
        });
      })
      .catch((error) => {
        reportErr(error);
      });
  } else {
    questionService
      .update(data.question_id, item)
      .then((res) => {
        editAllAnswer(res.data.id);

        clear();

        updateList();

        ElNotification({
          title: "Edited",
          type: "success",
        });
      })
      .catch((error) => {
        reportErr(error);
      });
  }
};

const editItem = (id) => {
  const el = data.item.question.find((el) => el.id == id);

  data.question = el.question;
  data.is_multiple_answer = el.is_multiple_answer;
  data.answer.forEach((item, ind) => {
    item.id = el.answer[ind]?.id;
    item.answer = el.answer[ind]?.answer;
    item.is_right = el.answer[ind]?.is_right;
  });

  data.is_edit = true;
  data.question_id = el.id;

  showModal();
};

const deleteItem = (id) => {
  ElMessageBox.confirm(
    "This action will delete the Question. Continue?",
    "Warning",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(() => {
      questionService
        .delete(id)
        .then((res) => {
          ElNotification({
            title: "Deleted",
            type: "success",
          });

          updateList();
        })
        .catch((error) => {
          reportErr(error);
        });
    })
    .catch(() => {});
};

const createAllAnswer = (question_id) => {
  for (let el of data.answer) {
    const newItem = {
      answer: el.answer,
      is_right: el.is_right,
      question_id,
    };

    answerService.create(newItem).catch((error) => {
      reportErr(error);
    });
  }
};

const editAllAnswer = (question_id) => {
  for (let el of data.answer) {
    const editItem = {
      answer: el.answer,
      is_right: el.is_right,
    };

    answerService.update(el.id, editItem).catch((error) => {
      reportErr(error);
    });
  }
};

onMounted(() => {
  updateList();
});
</script>

<style lang="css" scoped></style>
