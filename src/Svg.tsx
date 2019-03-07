import React from "react";
import * as d3 from "d3";
import { Data } from "./data";
import ResizeSVG from "./ResizeSVG";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";
import Bars from "./Bars";

interface SVGProps {
  data: Data[];
}

export default (props: SVGProps) => {
  const { data } = props;

  return (
    <ResizeSVG>
      {({ height, width }) => {
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
          <g>
            <AxisBottom {...axisBottomProps} />
            <AxisLeft {...axisLeftProps} />
            <Bars {...barProps} />
          </g>
        );
      }}
    </ResizeSVG>
  );
};
