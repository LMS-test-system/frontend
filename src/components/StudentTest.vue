<template>
  <div>
    <section class="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
      <div class="px-1 mx-auto max-w-screen-2xl lg:px-5">
        <div
          class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg"
        >
          <div
            class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4"
          >
            <div class="flex items-center flex-1 space-x-4">
              <p>Testlar ro'yhati</p>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table
              class="w-full text-sm text-center text-gray-500 dark:text-gray-400"
            >
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th scope="col" class="px-4 py-3">Test</th>
                  <th scope="col" class="px-4 py-3">Fan nomi</th>
                  <th scope="col" class="px-4 py-3">Testalr soni</th>
                  <th scope="col" class="px-4 py-3">Ajratilgan vaqt</th>
                  <th scope="col" class="px-4 py-3">Test boshlash</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="test in tests"
                  :key="test.id"
                  class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td
                    scope="row"
                    class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {{ test.name }}
                  </td>
                  <td class="px-4 py-2">
                    <span
                      class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300"
                      >{{ test.subject.name }}</span
                    >
                  </td>
                  <td
                    class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {{ test.type }}
                  </td>
                  <td
                    class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {{ test.time_limit }} min
                  </td>
                  <td
                    class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Button @click="startTest(test.id)" color="green"
                      >Boshlash</Button
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav
            class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span class="font-semibold text-gray-900 dark:text-white"
                >1-10</span
              >
              of
              <span class="font-semibold text-gray-900 dark:text-white"
                >1000</span
              >
            </span>
            <ul class="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >1</a
                >
              </li>

              <li>
                <a
                  href="#"
                  class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Button } from "flowbite-vue";
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { testService } from "../services/studentTests";
import { useAuthStore } from "../stores/auth/auth";

const router = useRouter();
const route = useRoute();

const tests = ref([]);

const authStore = useAuthStore();

const startTest = (id) => {
  const result = {
    student_id: authStore.getStaffId,
    test_id: id,
  };

  testService
    .checkResult(result)
    .then((res) => {
      if (res.data.check) {
        router.push(`/test/${id}`);
      }
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

onMounted(() => {
  testService.getAll().then((res) => {
    tests.value = res.data;
  });
});
</script>

<style lang="scss" scoped></style>
