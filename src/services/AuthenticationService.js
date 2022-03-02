import API from "@/services/API";

export default {
  register(credentials) {
    return API().post("register", credentials);
  },
};

// AuthencationService.register({
//     email:'test@gmail.com',
//     password: 1234
// })
