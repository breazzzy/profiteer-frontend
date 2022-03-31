import { defineStore } from "pinia";
import BuySellService from "@/services/BuySellService.js";

export const UserStore = defineStore({
  id: "UserStore",
  state: () => ({
    username: null,
    token: null,
    loggedin: false,
    watched_data: null, //Array that holds the watched stocks of the current user
    buy_data: null,
  }),
  getters: {
    getUsername: (state) => state.userId,
    getWatchedData: (state) => state.watched_data,
    getBuyData: (state) => state.buy_data,
  },
  actions: {
    setUsername(userId) {
      this.userId = userId;
    },
    setLoggedin(log) {
      this.loggedin = log;
      this.read();
    },
    logout() {
      this.loggedin = false;
      this.username = null;
      this.watched_data = null;
    },
    async read() {
      //This function reads data from backend into the store
      console.log("Reading user");
      this.buy_data = (await BuySellService.getBuys(this.getUsername)).data;
      console.log(this.buy_data);
      this.watched_data = (
        await BuySellService.getWatches(this.getUsername)
      ).data;
      // console.log()
    },
  },
});
