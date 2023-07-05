import axios from "../axios";
import { useAuthStore } from "../../stores/auth/auth";

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

    updateGroup: (id, state)=> axios.patch(`/student/group/${id}`, state, {
        headers:{
            "Authorization": `Bearer ${useAuthStore().getToken}`
        }
    }),

    getOneFull: (id) =>
    axios.get(`/student/full/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    
}


 
