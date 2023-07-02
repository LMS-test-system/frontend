import axios from "../axios";

export const useScience = {
    create: (state) => axios.post("/subject", state, {
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }),
    list : () => axios.get(`/subject`, {
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }),
    getOne : (id) => axios.get(`/subject/${id}`, {
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }),
    remove: (id)=> axios.delete(`/subject/${id}`, {
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }),
    update: (id, state)=> axios.patch(`/subject/${id}`, state, {
        headers:{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    }),
    
}
