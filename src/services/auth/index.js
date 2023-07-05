import axios from "../axios";
import { useAuthStore } from "../../stores/auth/auth";

export const authService = {
  login: (user, login_role) => axios.post(`/${login_role}/auth/signin`, user),
  getOneInfo: (id, login_role) => axios.get(`/${login_role}/${id}`,{
    headers: {
      Authorization: `Bearer ${useAuthStore().getToken}`,
    },
  }),
  update: (id, login_role, formdata) => axios.patch(`/${login_role}/${id}`, formdata, {
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${useAuthStore().getToken}`,
    },
  }),
  
};
