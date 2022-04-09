<template>
  <p>Helo</p>
  <body id="chartBody">
    <svg id="idForBubble" ref="svgRef"></svg>
  </body>
</template>

<script>
import * as d3 from "d3";
import { matchedRouteKey } from "vue-router";
export default {
  data(){
    return{
      svgWidth: 400,
      svgHeight: 400,
    }
  },
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
        { id: "abc", value: 20 },
        { id: "bbc", value: 10 },
        { id: "bbc", value: 50 },
        { id: "bbc", value: 22 },
        { id: "bbc", value: 13 },
        { id: "bbc", value: 1 },
      ];

      const colors = ['red','green','blue','orange','purple']
      let currentColor = 0;

      const V = d3.map(data, (d) => d.value);
      const I = d3.range(V.length).filter((i) => V[i] > 0);

      const svg = d3.select("#idForBubble");
      svg.attr('width', this.svgWidth).attr('height', this.svgHeight)
      const root = d3.pack().size([this.svgWidth, this.svgHeight]).padding(5)(
        d3.hierarchy({ children: I }).sum((i) => V[i])
      );

      svg.attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("fill", "white")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle");

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
        .style("fill", c => colors[currentColor == colors.length - 1 ? currentColor=0  : currentColor+=1])
        .attr("fill-opacity", 0.5)
        .attr("r", (d) => d.r);


      const uid = `O-${Math.random().toString(16).slice(2)}`;

      leaf.append("clipPath")
        .attr("id", d => `${uid}-clip-${d.data}`)
      .append("circle")
        .attr("r", d => d.r);
        
      // leaf.append("title").text((d) => d.id);

      leaf
        .append("text")
        .attr("clip-path", d => `url(${new URL(`#${uid}-clip-${d.data}`, location)})`)
        .selectAll("tspan")
        .data(d => data[d.data].id.split('/\n/g'))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i, D) => `${i - D.length / 2 + 0.85}em`)
        .attr("fill-opacity", (d, i, D) => (i === D.length - 1 ? 0.7 : null))
        .text(d => d);

      const node = d3.selectAll('circle').transition().attr('r', 0).duration(0).transition().attr('r', function(d) {return d.r + 10}).ease(d3.easeCubic).duration(3000).transition().attr('r', (d) => d.r).duration(500);
      console.log(node)
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

<style>
text{
  font-size: 10px;
  clip-path: 40%;
}
circle{
  /* outline-color: red; */
  stroke-width: 0px;
}
</style>
