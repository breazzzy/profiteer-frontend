<template>
  <h1>Yo</h1>
  <svg ref="svgRef" width="400" height="667">
    <g></g>
  </svg>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import {
  select,
  line,
  scaleLinear,
  min,
  max,
  curveBasis,
  axisBottom,
  axisLeft,
} from "d3";

export default {
  name: "d3ResponsiveLineChart",
  props: ["data"],
  setup(props) {
    const svgRef = ref(null);

    // const {}

    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    onMounted(() => {
      const svg = select(svgRef.value);
      svg.append("svg");

      let data = [],
        width = 400,
        height = 667,
        numPoints = 100;

      //   let zoom3 = zoom().on("zoom", handleZoom);

      //   function handleZoom(e) {
      //     select("svg g").attr("transform", e.transform);
      //   }

      //   function initZoom() {
      //     select("svg").call(zoom3);
      //   }

      function updateData() {
        data = [];
        for (let i = 0; i < numPoints; i++) {
          data.push({
            id: i,
            x: Math.random() * width,
            y: Math.random() * height,
          });
        }
      }

      function update() {
        select("svg g")
          .selectAll("circle")
          .data(data)
          .join("circle")
          .attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          })
          .attr("r", 3);
      }

      //   initZoom();
      updateData();
      update();
    });
    return svgRef;
  },
};
</script>
