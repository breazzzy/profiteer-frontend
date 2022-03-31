<script setup>
import pLineChart from "./pLineChart.vue";
import InfoService from "@/services/InfoService.js";
import HistoricalService from "@/services/HistoricalService.js";
import BuySellService from "@/services/BuySellService.js";
import { UserStore } from "@/stores/UserStore";
const store = UserStore();
</script>

<script>
// import { defineComponent } from "@vue/composition-api";
export default {
  props: { searched_symbol: String },
  data() {
    return {
      everyThingIsReady: false,
    };
  },
  methods: {
    async addToWatch() {
      try {
        const store = UserStore();
        const res = await BuySellService.addToWatch({
          username: store.getUsername,
          stockTicker: this.SYMBOL,
        });
        store.read();
      } catch (error) {
        alert(error);
      }
    },
    async addToBuy() {
      try {
        const store = UserStore();
        const res = await BuySellService.addToBuy({
          stockTicker: this.SYMBOL,
          username: store.getUsername,
          priceAtBuy: this.CURRENT_PRICE,
          amountBought: 20.0,
        });
        console.log("Finished Buy");
        store.read();
      } catch (error) {
        alert(error);
      }
    },
    async readData() {
      const result = await InfoService.post(this.searched_symbol);
      console.log(result.data.message);
      this.NAME = result.data.message.longName;
      this.SYMBOL = result.data.message.symbol;
      this.FIVETWOWEEK_HIGH = result.data.message.fiftyTwoWeekHigh;
      this.MARKET_CAP = result.data.message.marketCap;
      this.AVERAGE_VOLUME = result.data.message.averageDailyVolume3Month;
      this.ANALYST_RATING = result.data.message.averageAnalystRating;
      this.CURRENT_PRICE = result.data.message.currentPrice;
      const data = await HistoricalService.post(this.SYMBOL);
      console.log(data.data.message);
      this.OPEN = data.data.message[data.data.message.length - 1].open;
      this.VOLUME = data.data.message[data.data.message.length - 1].volume;
      this.CURRENT_PRICE =
        Math.round(
          data.data.message[data.data.message.length - 1].adjclose * 100
        ) / 100;
      this.passedData = data.data.message;
      this.everyThingIsReady = true;
    },
  },
  async setup() {},
  async mounted() {
    this.readData();
    // const data = await
    // function getData(symbol){
  },
  watch: {
    async searched_symbol() {
      await this.readData();
      this.$forceUpdate();
    },
  },
};
</script>

<template>
  <div class="card">
    <h5 class="card-header d-flex p-0">
      <div class="col-9">
        <b>{{ SYMBOL }}: </b>{{ CURRENT_PRICE }}
      </div>
      <button
        v-if="store.loggedin"
        class="btn btn-danger btn-sm col-1"
        @click="addToBuy()"
      >
        Buy
      </button>
      <button v-if="store.loggedin" class="btn btn-success btn-sm col-1">
        Sell
      </button>
      <button
        v-if="store.loggedin"
        class="btn btn-warning btn-sm col-1"
        @click="addToWatch()"
      >
        Watch
      </button>
    </h5>
    <div class="card-body">
      <template v-if="everyThingIsReady"
        ><pLineChart :passedData="passedData"
      /></template>

      <h5 class="card-title">
        <p>Stats</p>
        <div class="container">
          <div class="row">
            <div class="col">52wk High: {{ FIVETWOWEEK_HIGH }}</div>
            <div class="col">Open: {{ OPEN }}</div>

            <div class="col">Volume: {{ VOLUME }}</div>
          </div>

          <div class="row">
            <div class="col">Market Cap: {{ MARKET_CAP }}</div>
            <div class="col">
              Analyst Rating: {{ ANALYST_RATING
              }}<!--averageAnalystRating-->
            </div>

            <div class="col">Average Volume: {{ AVERAGE_VOLUME }}</div>
          </div>
        </div>
      </h5>
    </div>
  </div>
  <div class="card">
    <h5 class="card-header">Information</h5>
    <div class="card-body">
      <h5 class="card-title">{{ NAME }}</h5>
      <p class="card-text">STOCK INFO</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  /* background-color: lightgray; */
  padding-bottom: 10px;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.1);
}

.card-title {
  /* background-color: lightgray; */
  margin-top: 2%;
  /* outline: 2px solid rgba(0, 0, 0, 0.1); */
  /* box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.1); */
}

.container {
  font-size: 14px;
  /* box-shadow: inset 0 -2px 0 rgba(0, 0, 0, 0.1); */
}

.row {
  /* background-color: red; */
  outline: 2px dotted rgba(0, 0, 0, 0.25);
}

.col {
  /* background-color: red; */
  outline: 1px dotted rgba(0, 0, 0, 0.25);
}
</style>
