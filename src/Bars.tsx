import React, { useRef } from "react";
import { renderLifeCycle } from "./hooks/renderLifecycle";
import * as d3 from "d3";
import { Data } from "./data";

interface BarProps {
  datum: Data;
  height: number;
  width: number;
  xScale: d3.ScaleBand<any>;
  yScale: d3.ScaleLinear<any, any>;
}

const Bar = (props: BarProps) => {
  const rectRef = useRef(null);
  const { xScale, datum, height, yScale } = props;
  renderLifeCycle({
    firstRender: () => {
      d3.select(rectRef.current)
        .attr("fill", "green")
        .attr("x", xScale(datum.date) || 0)
        .attr("y", yScale(datum.value) || 0)
        .attr("height", 0)
        .attr("width", xScale.bandwidth())
        .transition()
        .attr("height", height - yScale(datum.value));
    },
    updateRender: () => {
      d3.select(rectRef.current)
        .attr("fill", "blue")
        .transition()
        .attr("x", xScale(datum.date) || 0)
        .attr("y", yScale(datum.value) || 0)
        .attr("width", xScale.bandwidth())
        .attr("height", height - yScale(datum.value));
    },
    lastRender: () => console.log("im out", datum)
  });

  return <rect data-testid="bar" ref={rectRef} />;
};

interface BarsProps {
  data: Data[];
  height: number;
  width: number;
  xScale: d3.ScaleBand<any>;
  yScale: d3.ScaleLinear<any, any>;
}

export default (props: BarsProps) => {
  const { data, height, width, xScale, yScale } = props;
  const barProps = {
    height,
    width,
    xScale,
    yScale
  };
  const bars = data.map(datum => (
    <Bar key={datum.id} {...barProps} datum={datum} />
  ));

  return <g className="bars">{height > 0 && width > 0 ? bars : null}</g>;
};
