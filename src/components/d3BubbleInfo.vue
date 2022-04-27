<template>
  <body id="bubbleBody">
    <svg id="idForBubble" ref="svgRef"></svg>
  </body>
</template>

<script>
import * as d3 from "d3";
import { matchedRouteKey } from "vue-router";
import { UserStore } from "@/stores/UserStore";
export default {
  props: ["svgWidth", "svgHeight"],
  // data() {},
  async mounted() {
    this.draw();
  },
  computed: {
    get_buydata() {
      const store = UserStore();
      return store.state.buy_data;
    },
  },
  watch: {
    get_buydata() {
      this.draw();
    },
  },
  methods: {
    async update() {
      //Go to git commits to find old function
      //Originally wanted chart to update in realtime instead of redrawing 
      //The entire chart everytime the data is changed.
      // This got really weird because of the way I import data into the bubble chart
      // in short the only thing the bubble chart knows about the original portfolio data
      // is an array index, if that array index changes when the data updates everthing breaks.
      // Its easy to imagine that a new stock being bought and added to that array would
      // break the chart.
      // I could probably fix this be redoing how i import data to the bubbles, but I
      // deemed it not worth it considering how long it took to get the bubbles up 
      // in the first place.
    },
    async draw() {
      if (d3.select("#idForBubble")) {
        d3.select("#idForBubble").remove();
        d3.select("#bubbleToolTip").remove();
      }
      d3.select("#bubbleBody").append("svg").attr("id", "idForBubble");

      //Get data
      //   const buy_data = store.state.buy_data;
      const buy_data = this.get_buydata;
      var merged_buydata = [];
      buy_data.data.forEach((item) => {
        const notYetAdded =
          merged_buydata.filter((e) => e.stockTicker === item.stockTicker)
            .length == 0;
        if (notYetAdded) {
          merged_buydata.push({
            stockTicker: item.stockTicker,
            amountBought: item.amountBought,
            value: item.amountBought * item.priceAtBuy,
          });
        } else {
          const itemToEdit = merged_buydata.find(
            (e) => e.stockTicker === item.stockTicker
          );
          itemToEdit.amountBought += item.amountBought;
          itemToEdit.value += item.amountBought * item.priceAtBuy;
        }
      });
      // Possible colors for bubbles
      const colors = ["red", "green", "blue", "#FF4500", "purple"];
      let currentColor = 0;

      const V = d3.map(merged_buydata, (d) => d.value);
      const I = d3.range(V.length).filter((i) => V[i] > 0);

      //Get svg component
      const svg = d3.select("#idForBubble");
      //Set width and height
      const width =
        d3.select("#idForBubble").node().parentNode.offsetWidth - 10;
      svg.attr("width", width).attr("height", this.svgHeight);
      // d3 Pack is a function that creates circles that can be packed into our selected width and height
      // Specifically it reurns an x,y and radius
      const root = d3.pack().size([width, this.svgHeight]).padding(5)(
        d3.hierarchy({ children: I }).sum((i) => V[i])
      );

      //Font
      svg
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
        .attr("fill", "black")
        .attr("font-size", 10)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "middle");
      // Creates 'bubbles', these only hold data for now
      // root.leaves returns a list of all 'leaves' essentially the x,y and radius data for
      // each bubble
      // to be clear leaves is what d3 calls this data
      const bubble = svg
        .selectAll("a")
        .data(root.leaves())
        .join("a")
        .attr("xlink:href", (d, i) => null)
        .attr("target", "_blank")
        .attr("transform", (d) => `translate(${d.x},${d.y})`);
      //Adds actual circle elements to each bubble
      bubble
        .append("circle")
        .attr("stroke", "black")
        .attr("stroke-width", 0)
        .attr("stroke-opacity", 0.5)
        .attr("opacity", 0.5)
        .style(
          "fill",
          (c) =>
            colors[
              currentColor == colors.length - 1
                ? (currentColor = 0)
                : (currentColor += 1)
            ]
        )
        .attr("r", (d) => d.r);

      //For clip path. This it taken 100% from the documentation
      const uid = `O-${Math.random().toString(16).slice(2)}`;
      //Adds clip path
      bubble
        .append("clipPath")
        .attr("id", (d) => `${uid}-clip-${d.data}`)
        .append("circle")
        .attr("r", (d) => d.r);
      //Adds Text
      bubble
        .append("text")
        .attr(
          "clip-path",
          (d) => `url(${new URL(`#${uid}-clip-${d.data}`, location)})`
        )
        .selectAll("tspan")
        .data((d) => merged_buydata[d.data].stockTicker.split("/\n/g"))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i, D) => `${i - D.length / 2 + 0.85}em`)
        .attr("fill-opacity", (d, i, D) => (i === D.length - 1 ? 0.7 : null))
        .text((d) => d);

      //Define tooltip in dom
      const toolTip = d3
        .select("body")
        .append("div")
        .attr("id", "bubbleToolTip")
        .attr("class", "tooltip")
        .attr("style", "position: absolute; opacity: 0;");

      //Mouse over functions for tooltip
      // The mouseover function makes the tooltip dom element visible.
      // The tooltip dom element is actually always on the screen but the opacity is 0
      d3.select("#bubbleBody")
        .selectAll("circle")
        .on("mouseover", function (event, d) {
          toolTip.transition().duration(200).style("opacity", 0.6);
          toolTip
            .html(
              merged_buydata[d.data].stockTicker +
                "<br/>" +
                merged_buydata[d.data].amountBought +
                " Shares <br/> $" +
                Math.round(merged_buydata[d.data].value * 100) / 100
            )
            .style("left", event.pageX + "px")
            .style("top", event.pageY + "px");
        })
        .on("mousemove", function (event, d) {
          toolTip
            .style("left", event.pageX + "px")
            .style("top", event.pageY + "px");
        })
        .on("mouseout", function (event, d) {
          toolTip.transition().duration(500).style("opacity", 0);
        });
      //Animate
      //Simple animation that has the bubbles grow in size for 3 seconds and then
      //Shrink to the real size for 1/2 a second
      const node = d3
        .select("#bubbleBody")
        .selectAll("circle")
        .transition()
        .attr("r", 0)
        .duration(0)
        .transition()
        .attr("r", function (d) {
          return d.r + 10;
        })
        .ease(d3.easeCubic)
        .duration(3000)
        .transition()
        .attr("r", (d) => d.r)
        .duration(500);
    },
  },
};
</script>

<style>
text {
  font-size: 10px;
  clip-path: 40%;
}

#bubbleToolTip {
  position: absolute;
  text-align: center;
  width: fit-content;
  height: fit-content;
  padding: 10px;
  font: 12px sans-serif;
  font-weight: bolder;
  color: whitesmoke;
  background: black;
  border: 4px;
  border-radius: 8px;
  pointer-events: none;
}
</style>
