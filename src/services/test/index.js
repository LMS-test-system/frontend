import axios from "../axios";
import { useAuthStore } from "../../stores/auth/auth";

// const authStore = useAuthStore();

export const testService = {
  create: (test) =>
    axios.post("/test", test, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  getAll: () =>
    axios.get(`/test`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  getOne: (id) =>
    axios.get(`/test/${id}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  update: (id, test) =>
    axios.patch(`/test/${id}`, test, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  delete: (id) =>
    axios.delete(`/test/${id}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

    
};
