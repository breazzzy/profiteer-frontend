import { defineStore } from "pinia";
import BuySellService from "@/services/BuySellService.js";
import { ref, watch } from "vue";
import AuthenticationService from "@/services/AuthenticationService";
// store.setUserBalance(response.data.user.balance);

export const UserStore = defineStore("UserStore", () => {
  const state = ref({
    username: null,
    token: null,
    loggedin: false,
    watched_data: [], //Array that holds the watched stocks of the current user
    buy_data: [],
    balance: 0,
  });

  if (localStorage.getItem("profiteerState")) {
    state.value = JSON.parse(localStorage.getItem("profiteerState"));
    console.log("Previous state loaded");
  }
  watch(
    state,
    (stateVal) => {
      localStorage.setItem("profiteerState", JSON.stringify(stateVal));
      console.log("State saved");
    },
    { deep: true }
  );

  const reset = () => {
    state.value.username = null;
    state.value.token = null;
    state.value.loggedin = false;
    state.value.watched_data = [];
    state.value.buy_data = [];
    state.value.balance = 0;
  };

  const setUsername = (newUsername) => {
    state.value.username = newUsername;
  };
  const setLoggedin = (log) => {
    state.value.loggedin = log;
    read();
  };
  const setToken = (token) => {
    state.value.token = token;
  };
  const setUserBalance = (bal) => {
    state.value.balance = bal;
  };
  const logout = () => {
    state.value.loggedin = false;
    state.value.username = null;
    state.value.watched_data = null;
    localStorage.removeItem("profiteerState");
    reset();
  };

  const getUsername = () => {
    return state.value.username.value;
  };
  const getWatchedData = () => {
    return state.value.watched_data;
  };
  const getBuyData = () => {
    return state.value.buy_data;
  };
  const getUserBalance = () => {
    return state.value.balance;
  };
  const getLoggedIn = () => {
    return state.value.loggedin;
  };
  const read = async () => {
    if (state.value.loggedin) {
      state.value.buy_data = await BuySellService.getBuys();
      state.value.balance = (
        await AuthenticationService.getBalance()
      ).data.balance;
      state.value.watched_data = (await BuySellService.getWatches()).data;
    }
  };
  return {
    state,
    setUsername,
    setLoggedin,
    setUserBalance,
    logout,
    read,
    getLoggedIn,
    setToken,
  };
});

// export const UserStore = defineStore({
//   id: "UserStore",
//   persist: true,
//   state: () => ({
//     username: null,
//     token: null,
//     loggedin: false,
//     watched_data: null, //Array that holds the watched stocks of the current user
//     buy_data: [],
//     balance: 0,
//   }),

//   getters: {
//     getUsername: (state) => state.userId,
//     getWatchedData: (state) => state.watched_data,
//     getBuyData: (state) => state.buy_data,
//     getUserBalance: (state) => state.balance,
//   },
//   actions: {
//     setUsername(userId) {
//       this.userId = userId;
//     },
//     setLoggedin(log) {
//       this.loggedin = log;
//       this.read();
//     },
//     setUserBalance(bal) {
//       this.balance = bal;
//     },
//     logout() {
//       this.loggedin = false;
//       this.username = null;
//       this.watched_data = null;
//     },
//     async read() {
//       //This function reads data from backend into the store
//       console.log("Reading user");
//       this.buy_data = await BuySellService.getBuys(this.getUsername);
//       this.balance = (
//         await AuthenticationService.getBalance({
//           username: this.getUsername,
//         })
//       ).data.balance;
//       // console.log(this.buy_data);
//       this.watched_data = (
//         await BuySellService.getWatches(this.getUsername)
//       ).data;

//       console.log("Finished reread");
//     },
//   },
// });
