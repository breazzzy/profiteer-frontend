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
    // const data = ref(props.passedData);
    const data = [];
    const direction = ref("horizontal");
    const margin = ref({
      left: 0,
      top: 20,
      right: 20,
      bottom: 0,
    });

    return { data, direction, margin };
  },
  async mounted() {},
};
</script>

<template v-if="passedData">
  <Chart
    :size="{ width: 800, height: 400 }"
    :data="passedData"
    :margin="margin"
    :direction="direction"
  >
    <template #layers>
      <Grid strokeDasharray="2,2" />
      <Line :dataKeys="['date', 'high']" />
    </template>
  </Chart>
</template>
