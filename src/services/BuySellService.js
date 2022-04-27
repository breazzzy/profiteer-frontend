import API from "@/services/API";

export default {
  //All api routes relating to buy/sell and watch data
  addToWatch(creds) {
    return API().post("watch", { data: creds });
  },
  getWatches() {
    // console.log("Posing to get_watch");
    return API().post("get_watch");
  },
  addToBuy(creds) {
    return API().post("buy", { data: creds });
  },
  getBuys() {
    // console.log("POSTING TO get_buys");
    return API().post("get_buys");
  },
  sell(creds) {
    return API().post("sell", { data: creds });
  },
};
