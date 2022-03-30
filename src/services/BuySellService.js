import API from "@/services/API";

export default {
  addToWatch(creds) {
    return API().post("watch", { data: creds });
  },
  getWatches(creds) {
    return API().post("get_watch", { username: creds });
  },
};
