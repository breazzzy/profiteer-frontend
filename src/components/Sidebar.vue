<script setup>
import pLineChart from "./pLineChart.vue";
import StockInfo from "./StockInfo.vue";
import BuySellService from "@/services/BuySellService.js";
import { UserStore } from "@/stores/UserStore";
import d3BubbleInfo from "./d3BubbleInfo.vue";
const store = UserStore();
</script>

<template>
  <nav
    id="sidebar"
    class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
  >
    <div v-if="store.getLoggedIn">
      <p id="username">
        <b>{{ store.state.username }}</b>
      </p>
      <!-- <div
        class="rounded-circle border d-flex justify-content-center align-items-center avatar"
        style="width: 100px; height: 100px"
        alt="Avatar"
      >
        <b>{{ store.getUsername }}</b>
      </div> -->

      <p id="balance">
        <b>Balance: ${{ Math.round(store.state.balance * 100) / 100 }}</b>
      </p>
      <u>Watched Stocks</u>
      <div v-for="stock in watchStocks" :key="stock.id">
        <a v-on:click="set_search_symbol(stock.stockTicker)">{{
          stock.stockTicker
        }}</a>
      </div>
      <p></p>
      <u>Current Holdings</u>
      <div
        class="container"
        v-for="stock in currentHoldings.data"
        :key="stock.id"
      >
        <div class="row">
          <span class="col-1"> {{ stock.amountBought }} &nbsp; </span>
          <span class="col-4" v-on:click="set_search_symbol(stock.stockTicker)">{{ stock.stockTicker }} @</span>
          <span class="col-4"> ${{ stock.priceAtBuy }}</span>

          <Popper class="col-3" placement="top" arrow>
            <button id='sellButton' class="btn btn-success btn-sm">
              <i class="bi bi-currency-dollar"></i>
            </button>
            <template #content id="salePopper">
              <div
                id="salePopperButton"
                class="btn btn-block btn-warning btn-sm"
                @click="
                  {
                    sellStock(stock);
                  }
                "
              >
                Confirm Sale
              </div>
            </template>
          </Popper>
        </div>
      </div>
      <!-- <button @click="reread"></button> -->
    </div>
    <div v-if="store.getLoggedIn">
      <d3BubbleInfo :svgWidth="300" :svgHeight="300"></d3BubbleInfo>
    </div>
    <!-- sidebar content -->
  </nav>
</template>

<script>
import { UserStore } from "@/stores/UserStore";

export default {
  data() {
    return {};
  },
  props: { searchQuery: String },
  computed: {
    //The advantage of using a computed prop instead of just sticking it in "data()" or using a method
    //is one that its a function and "data" cant have functions but most important is that methods arent reactive
    //This watchStocks() function will be called everytime store.getWatchedData is changed
    //This allows me to update the information on the sidebar everytime the user adds a new stock to their watch list
    //This prop reads the current users watch data
    watchStocks() {
      const store = UserStore();
      return store.state.watched_data;
    },
    currentHoldings() {
      //Updates current holdings
      const store = UserStore();
      return store.state.buy_data;
      // if (store.loggedin) {
      //   // console.log(store.getBuyData);
      // } else {
      //   return [];
      // }
    },
  },
  watch: {
    //Watchers for the two computed values these get called when those values change
    //We dont need to do anything here though, Vue automatically recalls the points in the template there used, the for loops in this case
    //Just kept here because it may be usefull to use them in the future
    watchStocks() {},
    currentHoldings() {},
  },
  methods: {
    reread() {
      //Deprecated, originally used to update the sidebar, and force read the database. Now each button calls a store.read() when clicked
      console.log(this.searchQuery);
      const store = UserStore();
      store.read();
    },
    set_search_symbol(sym) {
      this.$emit("updateSearchedSymbol", sym); //this.$emit sends the updated value to the root component in this case the Dash
      //Since the value being changed in 'Dash' is a prop any other compenent that references that value is updated aswell. In this case its the 'searchQuery' prop
    },
    async sellStock(stock) {
      //Method for selling stocks
      const store = UserStore();
      const response = await BuySellService.sell(stock); //The response for the sell route is a single float being the profit
      store.read();
      alert(
        "Profit of $" +
          Math.round(response.data.profit * 100) / 100 +
          "\n(" +
          response.data.regularMarketPrice +
          " - " +
          response.data.priceAtBuy +
          ") * " +
          response.data.amountBought
      );
    },
  },
  async mounted() {
    // const store = UserStore();
    // const res = await BuySellService.getWatches(store.getUsername);
    // console.log(res.data);
    // this.watchStocks = store.getWatchedData();
    // console.log("b");
  },
  setup(stock) {
    alert(stock.stockTicker);
  },
};
</script>

<style scoped>
@import url(https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css);

.sidebar {
  /* position: fixed; */
  text-align: center;
  font-size: 16px;
  overflow: scroll;
}

#salePopperButton {
  font-size: 16px;
}

#username {
  font-size: 24px;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  border-bottom: 2px solid black;
}

:deep(.popper) {
  /* background: #7e7312; */
  padding: 10px;
  /* border-radius: 300px; */
  font-weight: bold;
}

/* #balance {
} */

.row {
  /* text-align: left; */
  border-bottom: 1px solid grey;
}

#sellButton{
  padding-left: 5px;
  padding: 5px;
}
span{
  /* padding: ; */

  font-size: 12px;
}

:root {
  font-size: 220px;
  /* --popper-theme-border-radius: 10px; */
  --popper-theme-background-color: #115a70;
  /* --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25); */
}

@media (min-width: 767.98px) {
  .navbar {
    top: 0;
    position: sticky;
    z-index: 999;
  }
}

.avatar {
  vertical-align: middle;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 50%;
  background-color: rgba(13, 107, 189, 0.164);
  padding: 10px;

  width: 50%;
  height: 50%;
  border-radius: 50%;
  user-select: none;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 48px;
  box-shadow: inset -1px -1px 0 rgba(0, 0, 0, 0.1);
}
</style>
