import API from "@/services/API";

export default {
  login(credentials) {
    return API().post("login", credentials);
  },
};
