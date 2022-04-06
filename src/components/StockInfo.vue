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
  //searchQuery is passed in by the parent component, in this case the 'Dash'
  props: { searchQuery: String },
  data() {
    return {
      amountToBuy: null,
      everyThingIsReady: false,
      AVERAGE_VOLUME: null,
      SYMBOL: null,
      CURRENT_PRICE: null,
      VOLUME: null,
      MARKET_CAP: null,
      FIVETWOWEEK_HIGH: null,
      ANALYST_RATING: null,
      OPEN: null,
      NAME: null,
    };
  },
  methods: {
    //Adds current viewed stocks to watches for current user
    async addToWatch() {
      try {
        const store = UserStore();
        const res = await BuySellService.addToWatch({
          username: store.state.username,
          stockTicker: this.SYMBOL,
        });
        console.log(res);
        store.read();
      } catch (error) {
        alert(error);
      }
    },
    //Adds current views stock to buys for current user
    async addToBuy() {
      try {
        const store = UserStore();
        const res = await BuySellService.addToBuy({
          stockTicker: this.SYMBOL,
          username: store.state.username,
          priceAtBuy: this.CURRENT_PRICE,
          amountBought: this.amountToBuy,
        });
        alert("Buy Complete!");
        store.read();
      } catch (error) {
        if (error.response.status === 403) {
          alert("Token denied! Try logging back in");
        } else {
          alert(error);
        }
      }
    },
    //Function called when the Popper popup is closed
    closePopper() {
      this.amountToBuy = null;
    },
    //Function for reading data into the chart and stats on screen
    async readData() {
      const result = await InfoService.post(this.searchQuery);
      // console.log(result.data.message);
      this.NAME = result.data.message.longName;
      this.SYMBOL = result.data.message.symbol;
      this.FIVETWOWEEK_HIGH = result.data.message.fiftyTwoWeekHigh;
      this.MARKET_CAP = result.data.message.marketCap;
      this.AVERAGE_VOLUME = result.data.message.averageDailyVolume3Month;
      this.ANALYST_RATING = result.data.message.averageAnalystRating;
      this.CURRENT_PRICE = result.data.message.currentPrice;
      const data = await HistoricalService.post(this.SYMBOL);
      // console.log(data.data.message);
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
  },
  //Watches for when searchQuery changes, function is called as soon as that variable is changed
  watch: {
    async searchQuery() {
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
      <!-- <button
        v-if="store.loggedin"
        class="btn btn-danger btn-sm col-1"
        @click="addToBuy()"
      >
        Buy
      </button> -->
      <!--  -->
      <Popper
        class=""
        v-if="store.state.loggedin"
        arrow
        @close:popper="closePopper"
      >
        <button class="btn btn-danger">Buy</button>
        <template #content>
          <div class="d-flex justify-content-center">
            <input
              type="username"
              class="form-control"
              v-model="amountToBuy"
              id="usernameinput"
              placeholder="Amount $$$"
            />
            <button class="btn btn-primary" @click="addToBuy()">Confirm</button>
          </div>
        </template>
      </Popper>
      <!--  -->
      <button v-if="store.state.loggedin" class="btn btn-success btn-sm col-1">
        Sell
      </button>
      <button
        v-if="store.state.loggedin"
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
popper {
  margin-left: 0px;
  margin-right: 0px;
  font-size: 1px;
}
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
