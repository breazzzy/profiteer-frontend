import API from "@/services/API";

export default {
  post(symbol, period) {
    return API().post("stock_info_chart", { sym: symbol, period: period });
  },
  getDesc(symbol) {
    return API().post("desc", { sym: symbol });
  },
};

// AuthencationService.register({
//     email:'test@gmail.com',
//     password: 1234
// })
