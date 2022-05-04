<template>
  <div class="d-flex-inline" id="radio-buttons">
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        value="3"
        v-model="selectedMonth"
        @click="loadData"
        name="flexRadioDefault"
        id="flexRadioDefault1"
      />
      <label class="form-check-label" for="flexRadioDefault1"> 3 Months </label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        value="6"
        v-model="selectedMonth"
        @click="loadData"
        name="flexRadioDefault"
        id="flexRadioDefault1"
      />
      <label class="form-check-label" for="flexRadioDefault2"> 6 Months </label>
    </div>
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        value="12"
        v-model="selectedMonth"
        @click="loadData"
        name="flexRadioDefault"
        id="flexRadioDefault1"
      />
      <label class="form-check-label" for="flexRadioDefault2">
        12 Months
      </label>
    </div>
  </div>
  <body id="chartBody">
    <svg id="idForRef" ref="svgRef" width="1000" height="500"></svg>
  </body>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import HistoricalService from "@/services/HistoricalService.js";
import * as Vue from "vue";
import * as d3 from "d3";

export default {
  name: "d3ResponsiveLineChart",
  props: ["selectedMonth", "searchQuery"],
  data() {
    return { pageLoadedAllready: false };
  },
  async mounted() {
    this.drawChart();
  },
  setup() {},
  //Watch variables call function when the change
  watch: {
    selectedMonth() {
      this.drawChart();
    },
    searchQuery() {
      this.drawChart();
    },
  },
  methods: {
    async drawChart() {
      //Removes previous chart dom elements
      d3.select("#idForRef").remove();
      d3.select("#tooltip").remove();
      const MARGINS = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 20,
      };
      // Radius of dots on line
      const dot_radi =
        this.selectedMonth == 3 ? 4 : this.selectedMonth == 6 ? 2.5 : 2;
      const height = 500;
      //Sets width to the width of parent - margin
      const width =
        d3.select("#chartBody").node().parentNode.offsetWidth - MARGINS.left;
      const svg = d3.select("#chartBody").append("svg");
      // console.log(d3.select("#chartBody").node().parentNode.offsetWidth);
      svg.attr("id", "idForRef").attr("width", width).attr("height", height);

      //Get current date
      const today = new Date();
      //Set date to however many monthds back
      today.setMonth(today.getMonth() - this.selectedMonth);
      const stockData = (
        await HistoricalService.post(
          this.searchQuery,
          today.toISOString().substring(0, 10)
        )
      ).data.message;
      // console.log(stockData);
      // Month names
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      // Scale for x Axis
      //This is a function that we can pass x values in to map it in our SVG
      //D3 allows us to create scales that use dates/time instead of just numbers
      const X = d3
        .scaleTime()
        .domain([
          Date.parse(stockData[0].date),
          Date.parse(stockData[stockData.length - 1].date),
        ])
        .range([10, width - MARGINS.right]);
      // Scale for y Axis
      //This is a function that we can pass y values in to map it in our SVG
      const Y = d3
        .scaleLinear()
        .domain([0, d3.max(stockData, (d) => d.close)])
        .range([height - MARGINS.bottom, 10]);
      //Line
      //Like X and Y this returns a function we can pass data into
      const line = d3
        .line()
        .x((d) => X(Date.parse(d.date)))
        .y((d) => Y(d.close))
        .curve(d3.curveLinear); //Type of line, linear is standard line chart.
      //add path attribute to svg in dom
      //This is our line
      const path = d3
        .select("#idForRef")
        .append("path")
        .attr("transform", `translate(${MARGINS.left},10)`) //The $ syntax is actually a feature from VUE in this case, its used to have javascript variables in dom and came in useful here.
        .attr("d", line(stockData));
      //Define x and y axis
      const xAxis = d3.axisBottom().scale(X);
      const yAxis = d3.axisLeft().scale(Y);
      const xAxisRef = d3
        .select("#idForRef")
        .append("g") //G is an svg element used to group shapes together in this case its only being used to hold all the elements needed for the axis, lines and text
        //Grouping the elements like this isnt necessary but seems to be best practice. Also I found it makes debugging the svg's through inspect element easier
        .attr("id", "xAxis")
        .attr("transform", `translate(${MARGINS.left},470)`)
        .call(xAxis); //Call is a function that passes the last selected element into the function. This is the equivlent of xAxis(svg.append(g))
      const everypossibleday = X.ticks(d3.timeDay.every(1));
      //Build rectangular boxes that will highlight weekends
      d3.select("#idForRef")
        .append("g")
        .selectAll("bars")
        .data(
          everypossibleday.filter(function (value, index, arr) {
            return value.getDay() == 0 || value.getDay() == 6;
          })
        )
        .enter()
        .append("rect")
        .attr("transform", "translate(15,10)")
        .attr("x", function (d, i) {
          return X(Date.parse(d)) + width / everypossibleday.length / 2; //This pushes the bars over a few pixels to make sure its scaled correctly
        })
        .attr("y", function (d) {
          return 0;
        })
        .attr("width", width / everypossibleday.length)
        .attr("height", height - MARGINS.bottom)
        .attr("fill", "grey");
      //Add yAxis
      d3.select("#idForRef")
        .append("g")
        .attr("id", "yAxis")
        .attr("transform", `translate(${MARGINS.left + 10},20)`)
        .call(yAxis);
      //Add tooltip for highlighting
      const toolTip = d3
        .select("body")
        .append("div")
        .attr("id", "tooltip")
        .attr("class", "tooltip")
        .attr("style", "position: absolute; opacity: 0;");
      //Add dots to datapoints
      //The mouseover functions are for the tooltip
      d3.select("#idForRef")
        .append("g")
        .selectAll("dot")
        .data(stockData)
        .enter()
        .append("circle")
        .attr("transform", `translate(${MARGINS.left},10)`)
        .attr("r", dot_radi)
        .attr("cx", function (d) {
          return X(Date.parse(d.date));
        })
        .attr("cy", function (d) {
          return Y(d.close); //Y scale for price at current point
        })
        .on("mouseover", function (event, d) {
          d3.select("#tooltip")
            .transition()
            .duration(200)
            .style("opacity", 0.6);
          const day = new Date(Date.parse(d.date));

          d3.select("#tooltip")
            .html(
              monthNames[day.getMonth()] +
                " " +
                day.getDate() +
                "<br/> $" +
                Math.round(d.close)
            )
            .style("left", event.pageX + "px")
            .style("top", event.pageY + "px");
        })
        .on("mouseout", function (d) {
          d3.select("#tooltip").transition().duration(500).style("opacity", 0);
        });
      //Add animation
      d3.select("#idForRef")
        .selectAll("path")
        .transition()
        .duration(3000)
        .attrTween("stroke-dasharray", function () {
          const length = this.getTotalLength();
          return d3.interpolate(`0,${length}`, `${length},${length}`);
        })
        .style("stroke-width", "1px");
      //Animate radio buttons if this is our first time loading the page
      if (!this.pageLoadedAllready) {
        d3.select("#idForRef")
          .selectAll("label")
          .transition()
          .style("font-size", "1px")
          .duration(0)
          .transition()
          .style("font-size", "12px")
          .duration(1000);
        this.pageLoadedAllready = true;
      }
    },
  },
};
</script>

<style>
#radio-buttons {
  font-size: 12px;
}
#idForRef {
  padding-left: 0px;
  margin-left: 0px;
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.1);
}
path {
  stroke: black;
  /* transition: r 0.2s ease-in-out; */
  fill: none;
  stroke-width: 1px;
}

g {
  font-size: 10px;
}
.card {
  padding-bottom: 10px;
  padding: 10px;
  margin: 20px;
}
circle {
  fill: rgb(0, 128, 85);
}
rect {
  fill: darkgray;
  opacity: 0.05;
  outline-style: dashed;
  outline-width: 0.1px;
  outline-color: rgb(0, 0, 0, 0.1);
}

#tooltip {
  position: absolute;
  text-align: center;
  width: fit-content;
  height: fit-content;
  padding: 10px;
  font: 12px sans-serif;
  font-weight: bold;
  color: whitesmoke;
  background: black;
  border: 4px;
  border-radius: 8px;
  pointer-events: none;
}
</style>
