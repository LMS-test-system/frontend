<template>
  <div class="result-container">
    <h1 class="title">My Test Results</h1>
    <ul class="result-list">
      <li v-for="result in results" :key="result.id" class="result-item">
        <div class="result-info">
          <p class="test-id">{{ result?.test?.name }}</p>
          <p class="time-spent">Time Spent: {{ result.time_spent }} minutes</p>
          <p class="created-at">Date: {{ formatDate(result.createdAt) }}</p>
          <p class="score">Score: {{ getScore(result) }}%</p>
        </div>
        <div class="result-details">
          <p class="details-label">Details:</p>
          <ul class="details-list">
            <li
              v-for="question in result.resultQuestion"
              :key="question.id"
              class="detail-item"
            >
              <span class="detail-question">{{
                question.question.question
              }}</span>
              <span
                :class="{
                  'detail-answer': true,
                  'correct-answer': question.is_right,
                  'wrong-answer': !question.is_right,
                }"
              >
                {{ question.resultAnswer[0]?.answer?.answer }}
              </span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElNotification } from "element-plus";
import { useAuthStore } from "../stores/auth/auth";
import { studentService } from "../services/student";
import { reportErr } from "../constants/report";

const authStore = useAuthStore();

// Mocked test results data
const results = ref([]);

// Format the date to a readable format
function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
}

// Calculate the score based on the correctness of resultQuestion
function getScore(result) {
  const totalQuestions = result.resultQuestion.length;
  const correctAnswers = result.resultQuestion.filter(
    (question) => question.is_right
  ).length;
  const score = (correctAnswers / totalQuestions) * 100;
  return score.toFixed(0);
}

// Fetch test results data from API
onMounted(async () => {
  const staff_id = authStore.getStaffId;

  studentService
    .getOneFull(staff_id)
    .then((res) => {
      results.value = res.data?.result;
    })
    .catch((error) => {
      reportErr(error);
    });
});
</script>

<style scoped>
.result-container {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.result-list {
  list-style-type: none;
  padding: 0;
}

.result-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 20px;
}

.result-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 10px;
}

.test-id,
.time-spent,
.created-at,
.score {
  font-weight: bold;
}

.score {
  color: #007bff;
}

.result-details {
  margin-top: 10px;
}

.details-label {
  font-weight: bold;
}

.details-list {
  list-style-type: none;
  padding: 0;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.detail-question {
  font-weight: bold;
  margin-right: 10px;
}

.detail-answer {
  font-weight: bold;
}

.correct-answer {
  color: #28a745;
}

.wrong-answer {
  color: #dc3545;
}
</style>
