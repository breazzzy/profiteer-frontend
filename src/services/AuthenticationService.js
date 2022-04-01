import API from "@/services/API";

export default {
  register(credentials) {
    return API().post("register", credentials);
  },
  login(credentials) {
    return API().post("login", credentials);
  },
  getBalance(user) {
    console.log("POSTING TO GET_BALANCE");
    return API().post("balance", user);
  },
};

// AuthencationService.register({
//     email:'test@gmail.com',
//     password: 1234
// })
