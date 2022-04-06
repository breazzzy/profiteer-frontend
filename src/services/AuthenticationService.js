import API from "@/services/API";

export default {
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

// AuthencationService.register({
//     email:'test@gmail.com',
//     password: 1234
// })
