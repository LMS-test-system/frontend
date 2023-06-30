import axios from "../axios";
import { useAuthStore } from "../../stores/auth/auth";

// const authStore = useAuthStore();

export const answerService = {
  create: (answer) =>
    axios.post("/answer", answer, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  getAll: () =>
    axios.get(`/answer`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  getOne: (id) =>
    axios.get(`/answer/${id}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  update: (id, answer) =>
    axios.patch(`/answer/${id}`, answer, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  delete: (id) =>
    axios.delete(`/answer/${id}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),
};
