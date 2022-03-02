<script setup>
import pLineChart from "./pLineChart.vue";
import InfoService from "@/services/InfoService.js";
import HistoricalService from "@/services/HistoricalService.js";
</script>

<script>
// import { defineComponent } from "@vue/composition-api";
export default {
  props: { searched_symbol: String },
  data() {
    return {
      searched_symbol: "GME",
      everyThingIsReady: false,
    };
  },
  async setup() {},
  async mounted() {
    // const data = await
    const result = await InfoService.post("MRNA");
    console.log(result.data.message.symbol);
    this.NAME = result.data.message.longName;
    this.SYMBOL = result.data.message.symbol;
    const data = await HistoricalService.post("MRNA");
    console.log(data.data.message);
    this.passedData = data.data.message;
    this.everyThingIsReady = true;
  },
};
</script>

<template>
  <div class="card">
    <h5 class="card-header">{{ SYMBOL }}</h5>
    <div class="card-body">
      <template v-if="everyThingIsReady"
        ><pLineChart :passedData="passedData"
      /></template>

      <h5 class="card-title">Place holder for stats</h5>
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
