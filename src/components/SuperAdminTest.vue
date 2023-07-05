<template>
  <div>
    <h1 class="text-2xl font-bold w-72 p-2 2xl:p-5">Test</h1>

    <div class="p-2 2xl:p-5">
      <button
        @click="showModal"
        type="button"
        class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add test
      </button>
    </div>

    <div class="p-2 2xl:p-5">
      <div v-for="(el, ind) in data.list" :key="ind">
        <div
          class="flex items-center justify-between my-5 text-xs 2xl:text-base"
        >
          <h1 class="2xl:text-2xl font-bold w-52 2xl:w-72">{{ el.name }}</h1>

          <div class="flex gap-1 2xl:gap-3 items-center w-48">
            <img
              class="w-4 h-4 2xl:w-7 2xl:h-7 object-cover rounded-full"
              :src="`${api_url}/image/file/${el.subject.image?.file_name}`"
              onerror="this.src='/no-image.png'"
              alt=""
            />

            <h2>{{ el.subject.name }}</h2>
          </div>

          <div class="flex items-center justify-between w-36 2xl:w-48">
            <h2 class="flex gap-1">
              {{ el.type }} <span class="2xl:block hidden">questions</span
              ><span class="2xl:hidden block">q</span>
            </h2>

            <h2 class="flex gap-1">
              {{ el.time_limit }} <span class="2xl:block hidden">min</span
              ><span class="2xl:hidden block">m</span>
            </h2>
          </div>

          <div class="flex justify-between w-20 2xl:w-32">
            <button
              @click="router.push(`/test/${el.id}`)"
              class="w-5 h-5 2xl:w-10 2xl:h-10 text-md 2xl:text-2xl rounded-full hover:bg-slate-100 hover:text-blue-600 flex items-center justify-center"
            >
              <i class="bx bx-edit"></i>
            </button>

            <button
              @click="deleteItem(el.id)"
              class="w-5 h-5 2xl:w-10 2xl:h-10 text-md 2xl:text-2xl rounded-full hover:bg-slate-100 hover:text-red-600 flex items-center justify-center"
            >
              <i class="bx bx-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <form @submit.prevent="submit" v-if="isShowModal">
    <Modal @close="closeModal">
      <template #header>
        <div class="flex items-center text-lg">New test</div>
      </template>
      <template #body>
        <div class="mb-6 px-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            v-model="data.name"
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter name"
            required
          />
        </div>

        <div class="mb-6 px-5">
          <label
            for="type"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Type
          </label>
          <select
            v-model="data.type"
            id="type"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option selected disabled hidden :value="null">Select type</option>
            <option>10</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>
          </select>
        </div>

        <div class="mb-6 px-5">
          <label
            for="time_limit"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Time limit (in minutes)
          </label>
          <input
            v-model="data.time_limit"
            type="number"
            id="time_limit"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter time limit"
            required
          />
        </div>

        <div class="mb-6 px-5">
          <label
            for="subject_id"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Subject
          </label>
          <select
            v-model="data.subject_id"
            id="subject_id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option selected disabled hidden :value="null">
              Select subject
            </option>
            <option v-for="(el, ind) in data.subject" :key="ind" :value="el.id">
              {{ el.name }}
            </option>
          </select>
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
import { useRouter } from "vue-router";
import { ElMessageBox, ElNotification } from "element-plus";
import { Modal } from "flowbite-vue";
import { testService } from "../services/test";
import { subService } from "../services/subject";
import { reportErr } from "../constants/report";

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
  name: null,
  type: null,
  time_limit: null,
  subject_id: null,
  subject: [],
  list: [],
});

const clear = () => {
  data.name = null;
  data.type = null;
  data.time_limit = null;
  data.subject_id = null;

  closeModal();
};

const updateList = () => {
  testService
    .getAll()
    .then((res) => {
      data.list = res.data;
    })
    .catch((error) => {
      reportErr(error);
    });

  subService
    .getAll()
    .then((res) => {
      data.subject = res.data;
    })
    .catch((error) => {
      reportErr(error);
    });
};


const submit = () => {
  const newItem = {
    name: data.name,
    type: data.type,
    time_limit: data.time_limit,
    subject_id: data.subject_id,
  };

  testService
    .create(newItem)
    .then((res) => {
      const id = res?.data?.id;

      router.push(`/test/${id}`);

      clear();
    })
    .catch((error) => {
      reportErr(error);
    });
};

const deleteItem = (id) => {
  ElMessageBox.confirm(
    "This action will delete the Test collection, including all qustions and answers. Continue?",
    "Warning",
    {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning",
    }
  )
    .then(() => {
      testService
        .delete(id)
        .then((res) => {
          updateList();

          ElNotification({
            title: "Deleted",
            type: "success",
          });
        })
        .catch((error) => {
          reportErr(error);
        });
    })
    .catch(() => {});
};

onMounted(() => {
  updateList();
});
</script>
<style scoped></style>
