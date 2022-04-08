<template>
  <p>Helo</p>
  <body id="chartBody">
    <svg id="idForBubble" ref="svgRef" width="1000" height="500"></svg>
  </body>
</template>

<script>
import * as d3 from "d3";
import { matchedRouteKey } from "vue-router";
export default {
  async mounted() {
    console.log("Mounted Chart");

    this.draw();
  },
  methods: {
    async draw() {
      const data = [
        { id: "abc", value: 20 },
        { id: "bbc", value: 10 },
        { id: "abc", value: 20 },
        { id: "bbc", value: 10 },
        { id: "bbc", value: 50 },
        { id: "bbc", value: 22 },
        { id: "bbc", value: 13 },
        { id: "bbc", value: 1 },
      ];

      const V = d3.map(data, (d) => d.value);
      const I = d3.range(V.length).filter((i) => V[i] > 0);

      const svg = d3.select("#idForBubble");
      const root = d3.pack().size([200, 200]).padding(5)(
        d3.hierarchy({ children: I }).sum((i) => V[i])
      );

      const leaf = svg
        .selectAll("a")
        .data(root.leaves())
        .join("a")
        .attr("xlink:href", (d, i) => null)
        .attr("target", "_blank")
        .attr("transform", (d) => `translate(${d.x},${d.y})`);

      leaf
        .append("circle")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 0.5)
        .attr("fill", "blue")
        .attr("fill-opacity", 0.5)
        .attr("r", (d) => d.r);

      leaf.append("title").text((d) => d.id);

      leaf
        .append("text")
        .selectAll("tspan")
        .data(data)
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i, D) => `${i - D.length / 2 + 0.85}em`)
        .attr("fill-opacity", (d, i, D) => (i === D.length - 1 ? 0.7 : null))
        .text((d) => d.id);
      //   svg
      //     .selectAll("text")
      //     .data(data)
      //     .enter()
      //     .append("text")
      //     .attr("x", function (d) {
      //       return 4 + Math.PI;
      //     })
      //     .attr("y", function (d) {
      //       return 5 + 4;
      //     })
      //     .text(function (d) {
      //       return d.source;
      //     })
      //     .style("font-family", "arial")
      //     .style("font-size", "12px");
      //   svg
      //     .selectAll("circle")
      //     .data(data)
      //     .enter()
      //     .append("circle")
      //     .attr("cx", function (d) {
      //       return 20 + Math.random() * 500;
      //     })
      //     .attr("cy", function (d) {
      //       return 20;
      //     })
      //     .attr("r", function (d) {
      //       return d.value;
      //     })
      //     .attr("fill", function (d) {
      //       return d.color;
      //     });
    },
  },
};
</script>

<style></style>
