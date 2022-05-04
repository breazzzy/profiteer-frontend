<script setup>
import d3ResponsiveLineChart from "./d3ResponsiveLineChart.vue";
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
      STOCK_LONG_DESC: "",
      STOCK_CONTACT_ADRESS: "",
      STOCK_CONTACT_URL: "",
      STOCK_CONTACT_PHONE: "",
      STOCK_ADDRESS_UNDEFINED: undefined,
      STOCK_EMPLOYEES: 0,
      STOCK_INDUSTRY: "",
      COMPANY_OFFICERS: [],
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
        store.read();
      } catch (error) {
        alert(error);
      }
    },
    //Adds current views stock to buys for current user
    async addToBuy() {
      try {
        if(this.amountToBuy < 0){
          alert("Amount bought must be positive");
          this.amountToBuy = 0;
          return
        }
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
      let result;
      try {
        result = await InfoService.post(this.searchQuery);
      } catch (e) {
        alert("Search term not found");
        return;
      }
      this.NAME = result.data.message.longName;
      this.SYMBOL = result.data.message.symbol;
      this.FIVETWOWEEK_HIGH = result.data.message.fiftyTwoWeekHigh;
      this.MARKET_CAP = result.data.message.marketCap;
      this.AVERAGE_VOLUME = result.data.message.averageDailyVolume3Month;
      this.ANALYST_RATING = result.data.message.averageAnalystRating;
      this.CURRENT_PRICE = result.data.message.currentPrice;

      const today = new Date();
      today.setMonth(today.getMonth() - 1);
      const data = await HistoricalService.post(
        this.SYMBOL,
        today.toISOString().substring(0, 10)
      );
      this.OPEN = data.data.message[data.data.message.length - 1].open;
      this.VOLUME = data.data.message[data.data.message.length - 1].volume;
      this.CURRENT_PRICE =
        Math.round(
          data.data.message[data.data.message.length - 1].adjclose * 100
        ) / 100;
      this.passedData = data.data.message;

      const description = await HistoricalService.getDesc(this.SYMBOL);
      this.STOCK_LONG_DESC = description.data.longBusinessSummary;
      this.everyThingIsReady = true;
      this.STOCK_CONTACT_ADRESS =
        description.data.address1 +
        ", " +
        description.data.city +
        ", " +
        description.data.state +
        ", " +
        description.data.country +
        " " +
        description.data.zip;
      this.STOCK_ADDRESS_UNDEFINED = description.data.address1;
      this.STOCK_CONTACT_PHONE = description.data.phone;
      this.STOCK_CONTACT_URL = description.data.website;
      this.STOCK_INDUSTRY = description.data.industry;
      this.STOCK_EMPLOYEES = description.data.fullTimeEmployees;
      this.COMPANY_OFFICERS = description.data.companyOfficers;
    },
  },
  async setup() {},
  async mounted() {
    await this.readData();
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
      <div class="col-10">
        <b>{{ SYMBOL }}: </b>{{ CURRENT_PRICE }}
      </div>
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
              type="number"
              class="form-control"
              v-model="amountToBuy"
              min="0"
              id="usernameinput"
              placeholder="Amount in Shares"
            />
            <button class="btn btn-primary" @click="addToBuy()">Confirm</button>
          </div>
        </template> </Popper
      ><button
        v-if="store.state.loggedin"
        class="btn btn-warning btn-sm col-1"
        @click="addToWatch()"
      >
        Watch
      </button>
    </h5>

    <div class="card-body">
      <template v-if="everyThingIsReady">
        <d3ResponsiveLineChart
          :searchQuery="this.searchQuery"
          :selectedMonth="3"
        />
      </template>
      <!-- <div>Picked: {{ picked }}</div> -->

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
            <div class="col">Analyst Rating: {{ ANALYST_RATING }}</div>

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
      <div>
        <p class="card-text">{{ STOCK_LONG_DESC }}</p>
        <details>
          <summary>More Info.</summary>
          <div id="summaryDetails">
            <p>&emsp;Industry: {{ STOCK_INDUSTRY }}</p>
            <p>&emsp;Employees: {{ STOCK_EMPLOYEES }}</p>

            <div id="summaryDetails" style="margin-left: 10px">
              <details>
                <summary>Company Officers</summary>
                <div
                  id="summaryDetails"
                  v-for="officer in COMPANY_OFFICERS"
                  :key="officer.name"
                >
                  <p>&emsp; {{ officer.name + ", " + officer.title }}</p>
                </div>
              </details>
            </div>
          </div>
        </details>
      </div>

      <h5 class="card-title">Contact</h5>
      <div id="contactBody">
        <span
          v-if="this.STOCK_ADDRESS_UNDEFINED !== undefined"
          id="contactSpan"
          class="card-text"
          >{{ STOCK_CONTACT_ADRESS }}<br
        /></span>
        <span
          v-if="this.STOCK_CONTACT_PHONE !== 'NA'"
          id="contactSpan"
          class="card-text"
          >{{ STOCK_CONTACT_PHONE }}<br />
        </span>
        <span
          v-if="this.STOCK_CONTACT_URL !== undefined"
          id="contactSpan"
          class="card-text"
          ><a :href="STOCK_CONTACT_URL" target="_blank">{{
            STOCK_CONTACT_URL
          }}</a
          ><br
        /></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
popper {
  margin-left: 0px;
  margin-right: 0px;
  font-size: 1px;
}

#contactBody {
  line-height: 25px;
}
#summaryDetails {
  line-height: 1px;
}
summary {
  font-size: 12px;
  font-style: oblique;
}
details {
  font-size: 12px;
  line-height: 40px;
}

#contactSpan {
  font-size: 12px;
  line-height: 1px;
  font-style: italic;
}

.card {
  /* background-color: lightgray; */
  padding-bottom: 10px;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.1);
}

.card-text {
  font-size: 12px;
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

.col {
  /* background-color: red; */
  outline: 1px dotted rgba(0, 0, 0, 0.25);
  font-style: oblique;
}
</style>
