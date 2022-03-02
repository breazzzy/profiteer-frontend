<script>
import { ref } from "vue";
import { Chart, Grid, Line } from "vue3-charts";

export default {
  props: { passedData: Array },
  name: "pLineChart",
  components: { Chart, Grid, Line },

  data() {
    return {
      everyThingIsReady: false,
    };
  },

  setup(props) {
    const data = ref(props.passedData);
    const direction = ref("horizontal");
    const margin = ref({
      left: 0,
      top: 20,
      right: 20,
      bottom: 0,
    });

    return { data, direction, margin };
  },
  async mounted() {
    console.log(this.passedData);
  },
};
</script>

<template v-if="everyThingIsReady">
  <Chart
    :size="{ width: 800, height: 400 }"
    :data="data"
    :margin="margin"
    :direction="direction"
  >
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Line :dataKeys="['date', 'high']" />
    </template>
  </Chart>
</template>
