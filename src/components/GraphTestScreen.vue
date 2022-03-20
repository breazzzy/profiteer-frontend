<template>
  <div>
    <h1>Chart</h1>
    <d3ResponsiveLineChart :data="data" />
  </div>
</template>

<script>
import d3ResponsiveLineChart from "./d3ResponsiveLineChart.vue";

export default {
  components: {
    d3ResponsiveLineChart,
  },

  data() {
    return {
      data: [10, 40, 15, 25, 50],
    };
  },
};
</script>
