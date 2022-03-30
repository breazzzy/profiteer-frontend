import { defineStore } from "pinia";

export const UserStore = defineStore({
  id: "UserStore",
  state: () => ({
    username: null,
    token: null,
    loggedin: false,
  }),
  getters: {
    getUsername: (state) => state.userId,
  },
  actions: {
    setUsername(userId) {
      this.userId = userId;
    },
    setLoggedin(log) {
      this.loggedin = log;
    },
  },
});
