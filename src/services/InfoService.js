import API from "@/services/API";

export default {
  post(symbol) {
    return API().post("stock_info", { sym: symbol });
  },
};

// AuthencationService.register({
//     email:'test@gmail.com',
//     password: 1234
// })
