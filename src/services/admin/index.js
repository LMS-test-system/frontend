import axios from "../axios";
import { useAuthStore } from "../../stores/auth/auth";

const store = useAuthStore();

export const adminService = {
  create: (admin) =>
    axios.post("/admin", admin, {
      headers: {
        Authorization: `Bearer ${store.getToken}`,
      },
    }),

  getAll: () =>
    axios.get(`/admin`, {
      headers: {
        Authorization: `Bearer ${store.getToken}`,
      },
    }),
};
