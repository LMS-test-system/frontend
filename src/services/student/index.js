import axios from "../axios";

export const studentService = {
  create: (state) =>
    axios.post("/student", state, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  list: () =>
    axios.get(`/student`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  remove: (id) =>
    axios.delete(`/student/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  update: (id, state) =>
    axios.patch(`/student/${id}`, state, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),

  getOne: (id) =>
    axios.get(`/student/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),

  getOneFull: (id) =>
    axios.get(`/student/full/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
};
