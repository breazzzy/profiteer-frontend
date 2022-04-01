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
        <a v-on:click="set_search_symbol(stock.stockTicker)">{{
          stock.stockTicker
        }}</a>
      </div>
      <p></p>
      <u>Current Holdings</u>
      <div class="container" v-for="stock in currentHoldings" :key="stock.id">
        <div class="row">
          <span class="col-2"> {{ stock.amountBought }} </span>
          <span class="col-4">{{ stock.stockTicker }} @</span>
          <span class="col-3"> ${{ stock.priceAtBuy }}</span>

          <Popper class="col-3" placement="top" arrow>
            <button class="btn btn-success btn-sm">
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
    <!-- sidebar content -->
  </nav>
</template>

<script>
import { UserStore } from "@/stores/UserStore";

export default {
  data() {
    return {};
  },
  props: { searched_symbol: String },
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
    currentHoldings() {
      const store = UserStore();
      return store.getBuyData;
    },
  },
  watch: {
    watchStocks() {
      console.log("Watch Stocks have changed");
    },
    currentHoldings() {
      console.log("Current Holdings updated");
    },
  },
  methods: {
    reread() {
      console.log(this.searched_symbol);
      const store = UserStore();
      store.read();
    },
    set_search_symbol(sym) {
      console.log(sym);
      this.$emit("updateSearchedSymbol", sym);
    },
    sellStock(stock) {
      alert(stock.amountBought);
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
  text-align: left;
  font-size: 16px;
  overflow: scroll;
}

#salePopperButton {
  font-size: 16px;
}

:deep(.popper) {
  /* background: #7e7312; */
  padding: 10px;
  /* border-radius: 300px; */
  font-weight: bold;
}

.row {
  /* text-align: left; */
  border-bottom: 1px solid grey;
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
</style>
