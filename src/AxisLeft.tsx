import React, { useRef } from "react";
import * as d3 from "d3";
import { renderLifeCycle } from "./hooks/renderLifecycle";

interface AxisProps {
  scale: d3.ScaleLinear<any, any>;
}

export default (props: AxisProps) => {
  const gRef = useRef<SVGGElement>(null);

  renderLifeCycle({
    firstRender: () =>
      gRef.current && d3.select(gRef.current).call(d3.axisLeft(props.scale)),
    updateRender: () =>
      gRef.current &&
      d3
        .select(gRef.current)
        .transition()
        .call(d3.axisLeft(props.scale))
  });

  return <g ref={gRef} />;
};
