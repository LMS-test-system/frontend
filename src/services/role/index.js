import axios from "../axios";
import { useAuthStore } from "../../stores/auth/auth";

// const authStore = useAuthStore();

export const roleService = {
  create: (subject) =>
    axios.post("/role", subject, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  getAll: () =>
    axios.get(`/role`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  getOne: (id) =>
    axios.get(`/role/${id}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  update: (id, subject) =>
    axios.patch(`/role/${id}`, subject, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),

  delete: (id) =>
    axios.delete(`/role/${id}`, {
      headers: {
        Authorization: `Bearer ${useAuthStore().getToken}`,
      },
    }),
};
