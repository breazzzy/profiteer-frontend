import API from "@/services/API";

export default {
  addToWatch(creds) {
    return API().post("watch", { data: creds });
  },
  getWatches(creds) {
    console.log("Posing to get_watch");
    return API().post("get_watch", { username: creds });
  },
  addToBuy(creds) {
    console.log("Buyyyy");
    return API().post("buy", { data: creds });
  },
  getBuys(creds) {
    console.log("POSTING TO get_buys");
    return API().post("get_buys", { username: creds });
  },
  sell(creds) {
    return API().post("sell", { data: creds });
  },
};
