import API from "@/services/API";

export default {
  post(symbol, period) {
    return API().post("stock_info_chart", { sym: symbol, period: period });
  },
};

// AuthencationService.register({
//     email:'test@gmail.com',
//     password: 1234
// })
