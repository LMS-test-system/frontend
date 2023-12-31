import axios from "../axios";
import { useAuthStore } from "../../stores/auth/auth";

// const authStore = useAuthStore();

export const resultService = {
  create: (result) =>
    axios.post("/result", result, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  getAll: () =>
    axios.get(`/result`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  getOne: (id) =>
    axios.get(`/result/${id}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  delete: (id) =>
    axios.delete(`/result/${id}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  createResultQuestion: (payload) =>
    axios.post(`/result-question`, payload, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  createResultAnswer: (payload) =>
    axios.post(`/result-answer`, payload, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  checkResult: (result) =>
    axios.post(`/result/check`, result, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  calculateResult: (id) =>
    axios.get(`/result/calculate/${id}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),
};
