import React, { useRef } from "react";
import { useContainerSize } from "./hooks/containerSize";
import * as d3 from "d3";
import { Data } from "./data";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";
import Bars from "./Bars";

interface SVGProps {
  data: Data[];
}

export default (props: SVGProps) => {
  const { data } = props;

  const containerDiv = useRef(null);
  const { height: svgHeight, width: svgWidth } = useContainerSize(containerDiv);

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };

  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const xScale = d3
    .scaleBand()
    .range([0, width])
    .padding(0.1);

  const yScale = d3.scaleLinear().range([height, 0]);

  xScale.domain(data.map(d => d.date));
  yScale.domain([0, d3.max(data, d => d.value) || 0]);

  const axisBottomProps = {
    height,
    scale: xScale
  };
  const axisLeftProps = { scale: yScale };

  const barProps = {
    height,
    width,
    xScale,
    yScale,
    data
  };

  return (
    <div ref={containerDiv} style={{ height: "100%", width: "100%" }}>
      <svg height={svgHeight} width={svgWidth}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom {...axisBottomProps} />
          <AxisLeft {...axisLeftProps} />
          <Bars {...barProps} />
        </g>
      </svg>
    </div>
  );
};
