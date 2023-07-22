import React from "react";
import * as d3 from "d3-scale";
const Bars = (props) => {
  const {data, dimensions} = props;
  const xScale = d3.scaleBand().domain(data.map((d) => d.dt.toString())).range([0, dimensions.width]);
  const yScale = d3.scaleLinear().domain([0, 100]).range([0, dimensions.height]);
  return /* @__PURE__ */ React.createElement("svg", {
    x: dimensions.marginLeft,
    y: dimensions.marginTop,
    height: dimensions.height,
    width: dimensions.width,
    overflow: "visible"
  }, data.map((d, dNdx) => /* @__PURE__ */ React.createElement("rect", {
    height: yScale(d.humidity),
    width: xScale.bandwidth(),
    x: xScale(d.dt.toString()),
    y: dimensions.height - yScale(d.humidity),
    stroke: "salmon",
    fill: "darksalmon"
  })));
};
export default Bars;
