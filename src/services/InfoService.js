import API from "@/services/API";

export default {
  //Api call for current stock info,
  // this is used for company information.
  post(symbol) {
    return API().post("stock_info", { sym: symbol });
  },
};
