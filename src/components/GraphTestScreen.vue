<template>
  <div>
    <img src="@/assets/logo_profiteer.svg" width="100" height="50" />
    <h1>Chart</h1>
    <textarea v-model="searchQuery"></textarea>
    <d3ResponsiveLineChart
      :searchQuery="searchQuery"
      :selectedMonth="selectedMonth"
    />
    <button @click="loadData">click</button>
  </div>

  <div>
    <d3BubbleInfo :svgWidth="1000" :svgHeight="1000"></d3BubbleInfo>
  </div>
</template>

<script>
import d3ResponsiveLineChart from "./d3ResponsiveLineChart.vue";
import d3BubbleInfo from "./d3BubbleInfo.vue";
import HistoricalService from "@/services/HistoricalService.js";
// import LogoSVG from "../assets/logo_profiteer.svg";

export default {
  components: {
    d3ResponsiveLineChart,
    d3BubbleInfo,
    // LogoSVG,
  },

  data() {
    return {
      searchQuery: "gme",
      selectedMonth: 3,
    };
  },
  watch: {
    searchQuery() {
      console.log(this.searchQuery);
    },
  },
  computed: {
    async thisIsData() {
      console.log("thisIsData");
      const today = new Date();
      today.setMonth(today.getMonth() - this.selectedMonth);
      console.log("return await");
      const exportData = (
        await HistoricalService.post(
          this.searchQuery,
          today.toISOString().substring(0, 10)
        )
      ).data.message;
      console.log("exporting");
      console.log(exportData);
      return exportData;
    },
  },
  methods: {
    async loadData() {
      const today = new Date();
      today.setMonth(today.getMonth() - this.selectedMonth);
      (
        await HistoricalService.post(
          this.searchQuery,
          today.toISOString().substring(0, 10)
        )
      ).data.message;
      console.log(this.data);
    },
  },
};
</script>
