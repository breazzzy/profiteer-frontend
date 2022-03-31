<script setup>
import pLineChart from "./pLineChart.vue";
import StockInfo from "./StockInfo.vue";
import BuySellService from "@/services/BuySellService.js";
import { UserStore } from "@/stores/UserStore";
const store = UserStore();
</script>

<template>
  <nav
    id="sidebar"
    class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
  >
    <div v-if="store.loggedin">
      <p>
        <b>{{ store.getUsername }}</b>
      </p>
      <u>Watched Stocks</u>
      <div v-for="stock in watchStocks" :key="stock.id">
        {{ stock.stockTicker }}
      </div>
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
  computed: {
    //The advatage of using a computed prop instead of just sticking it in "data()" or using a method
    //is one that its a function and "data" cant have functions but most important is that methods arent reactive
    //This watchStocks() function will be called everytime store.getWatchedData is changed
    //This allows me to update the information on the sidebar everytime the user adds a new stock to their watch list
    //This prop reads the current users watch data
    watchStocks() {
      const store = UserStore();
      return store.getWatchedData;
    },
  },
  watch: {
    watchStocks() {
      console.log("Watch Stocks have changed");
    },
  },
  async mounted() {
    // const store = UserStore();
    // const res = await BuySellService.getWatches(store.getUsername);
    // console.log(res.data);
    // this.watchStocks = store.getWatchedData();
    // console.log("b");
  },
  setup() {},
};
</script>

<style>
@import url(https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css);
.sidebar {
  /* position: fixed; */
  text-align: center;
  font-size: 16px;
}

@media (min-width: 767.98px) {
  .navbar {
    top: 0;
    position: sticky;
    z-index: 999;
  }
}
</style>
