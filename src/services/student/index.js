import axios from "../axios";
import { useAuthStore } from "../../stores/auth/auth";

export const useStudent = {
    create: (state) => axios.post("/student", state, {
        headers:{
            "Content-type": "multipart/form-data",
            "Authorization": `Bearer ${useAuthStore().getToken}`
        }
    }),
    list : () => axios.get(`/student`, {
        headers:{
            "Authorization": `Bearer ${useAuthStore().getToken}`
        }
    }),
    getOne : (id) => axios.get(`/student/${id}`, {
        headers:{
            "Authorization": `Bearer ${useAuthStore().getToken}`
        }
    }),
    remove: (id)=> axios.delete(`/student/${id}`, {
        headers:{
            "Authorization": `Bearer ${useAuthStore().getToken}`
        }
    }),
    update: (id, state)=> axios.patch(`/student/${id}`, state, {
        headers:{
            "Authorization": `Bearer ${useAuthStore().getToken}`
        }
    }),
    
}
