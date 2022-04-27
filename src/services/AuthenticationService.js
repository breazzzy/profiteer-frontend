import API from "@/services/API";

export default {
  //These are all the api calls relating to registering
  register(credentials) {
    return API().post("register", credentials);
  },
  login(credentials) {
    return API().post("login", credentials);
  },
  getBalance() {
    return API().post("balance");
  },
};
