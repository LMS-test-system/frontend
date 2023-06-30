import axios from "../axios";
import  {useAuthStore} from "../../stores/auth/auth";

// const store = useAuthStore();

export const testService = {
  
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

    createResult: (result) =>
    axios.post(`/result`, result, {
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
};
