import axios from "../axios";

export const authService = {
  login: (user, login_role) => axios.post(`/${login_role}/auth/signin`, user),
};
