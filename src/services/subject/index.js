import axios from "../axios";
import { useAuthStore } from "../../stores/auth/auth";

// const authStore = useAuthStore();

export const subService = {
  create: (subject) =>
    axios.post("/subject", subject, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  getAll: () =>
    axios.get(`/subject`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  getOne: (id) =>
    axios.get(`/subject/${id}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  update: (id, subject) =>
    axios.patch(`/subject/${id}`, subject, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  delete: (id) =>
    axios.delete(`/subject/${id}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),
};
