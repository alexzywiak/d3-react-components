import React, { useRef } from "react";
import * as d3 from "d3";
import { renderLifeCycle } from "../hooks/renderLifecycle";

interface AxisProps {
  height: number;
  scale: d3.ScaleBand<any>;
}

export default (props: AxisProps) => {
  const gRef = useRef<SVGGElement>(null);

  renderLifeCycle({
    firstRender: () =>
      gRef.current && d3.select(gRef.current).call(d3.axisBottom(props.scale)),
    updateRender: () =>
      gRef.current &&
      d3
        .select(gRef.current)
        .transition()
        .call(d3.axisBottom(props.scale))
  });

  return <g transform={`translate(0,${props.height})`} ref={gRef} />;
};
