import API from "@/services/API";

export default {
  addToWatch(creds) {
    return API().post("watch", { data: creds });
  },
  getWatches(creds) {
    return API().post("get_watch", { username: creds });
  },
  addToBuy(creds) {
    console.log("Buyyyy");
    return API().post("buy", { data: creds });
  },
  getBuys(creds) {
    return API().post("get_buys", { username: creds });
  },
};
