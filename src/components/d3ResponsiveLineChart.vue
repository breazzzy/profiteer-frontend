<template>
  <svg id="idForRef" ref="svgRef" width="800" height="500">
  </svg>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import * as d3 from "d3";

export default {
  name: "d3ResponsiveLineChart",
  props: ["data"],
  mounted(){
    const testdata = [{"step":0,"value":2.387926594027067},{"step":1,"value":2.4062479800130117},{"step":2,"value":2.7050578216983694},{"step":3,"value":2.4330287951478327},{"step":4,"value":2.9092960612145027},{"step":5,"value":2.792490552155116},{"step":6,"value":2.646820445845527},{"step":7,"value":2.618311998221048},{"step":8,"value":2.199418763764701},{"step":9,"value":2.1934075827138404},{"step":10,"value":1.7212727097666636},{"step":11,"value":1.7627662609686585},{"step":12,"value":2.096893004489389},{"step":13,"value":2.315564823059495},{"step":14,"value":2.407421611589666},{"step":15,"value":2.5415008114855024},{"step":16,"value":2.4977106767624333},{"step":17,"value":2.594994671704047},{"step":18,"value":2.5589011370793284},{"step":19,"value":2.444226200053255},{"step":20,"value":2.004857016297871},{"step":21,"value":2.2534102077374514},{"step":22,"value":2.5329755530166516},{"step":23,"value":3.0209646556857637},{"step":24,"value":3.5019147964628994},{"step":25,"value":3.66597193914872},{"step":26,"value":3.2466001458170775},{"step":27,"value":2.8076734827093697},{"step":28,"value":3.23436338859491},{"step":29,"value":3.6597286514728156},{"step":30,"value":4},{"step":31,"value":4},{"step":32,"value":3.6282664398419024},{"step":33,"value":3.590210053536863},{"step":34,"value":3.2690798291522185},{"step":35,"value":3.116194913966688},{"step":36,"value":2.9189863360804544},{"step":37,"value":3.2049042086390775},{"step":38,"value":3.6546387872282033},{"step":39,"value":3.97337334182704},{"step":40,"value":4},{"step":41,"value":3.5196531899821757},{"step":42,"value":3.1453260211991276},{"step":43,"value":3.3161305429572945},{"step":44,"value":3.541132951462595},{"step":45,"value":3.943853796717561},{"step":46,"value":4},{"step":47,"value":4},{"step":48,"value":3.633556112362962},{"step":49,"value":3.848956272483938}];
    // const svg = d3.select("#idForRef").append('circle').attr("cx", 40).attr("cy",20).attr('r',20).attr('fill', 'blue');  
    const line = d3.line().x(d => walkX(d.step)).y(d => walkY(d.value)).curve(d3.curveNatural);
    const data = [[0,10],[10,10],[20,30],[30,15],[40,45],[50,60]]
    const walkX = d3.scaleLinear().domain([0,49]).range([10,800-10])
    const walkY = d3.scaleLinear().domain([0,4]).range([200-10,10])
    d3.select('#idForRef').append('path').attr('d', line(testdata)).attr('transform','translate(15,10)');
    const xAxis =  d3.axisBottom().scale(walkX);
    const yAxis = d3.axisLeft().scale(walkY);
    d3.select('#idForRef').attr('transform','translate(40,10)')
    d3.select('#idForRef').append('g').attr('transform', 'translate(15,200)').call(xAxis);
    d3.select('#idForRef').append('g').attr('transform', 'translate(25,10)').call(yAxis);
    // d3.select('#idForRef').append('path')
  },
  setup() {
  },
};
</script>

<style>
path{
  stroke: black;
  fill: none;
  
}
g{
  font-size: 10px;
}
</style>
