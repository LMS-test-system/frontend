import axios from "../axios";
import { useAuthStore } from "../../stores/auth/auth";

export const teacherService = {
    create: (state) => axios.post("/teacher", state, {
        headers:{
            "Content-type": "multipart/form-data",
            "Authorization": `Bearer ${useAuthStore().getToken}`
        }
    }),
    list : () => axios.get(`/teacher`, {
        headers:{
            "Authorization": `Bearer ${useAuthStore().getToken}`
        }
    }),
    getOne : (id) => axios.get(`/teacher/${id}`, {
        headers:{
            "Authorization": `Bearer ${useAuthStore().getToken}`
        }
    }),
    findOne : (id) => axios.get(`/teacher/${id}`, {
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }),
    remove: (id)=> axios.delete(`/teacher/${id}`, {
        headers:{
            "Authorization": `Bearer ${useAuthStore().getToken}`
        }
    }),
    update: (id, state)=> axios.patch(`/teacher/${id}`, state, {
        headers:{
            "Authorization": `Bearer ${useAuthStore().getToken}`
        }
    }),
    
}
