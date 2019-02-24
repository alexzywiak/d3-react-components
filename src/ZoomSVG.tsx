import * as React from "react";
import * as d3 from "d3";
import Circle from "./Circle";

export default class ZoomSVG extends React.Component {
  ref: SVGGElement | null = null;
  componentDidMount() {
    const zoomed = () => {
      console.log("zoomies");
      const currentTransform = d3.event.transform;
      d3.select(this.ref)
        .select("g")
        .attr("transform", currentTransform);
    };
    const zoom = d3
      .zoom()
      .scaleExtent([1, 10])
      .on("zoom", zoomed);

    d3.select(this.ref).call(zoom as any);
  }
  render() {
    return (
      <svg height="500" width="500">
        <g ref={ref => (this.ref = ref)}>
          <rect height="500" width="500" fill="none" pointerEvents="all" />
          <g>
            <Circle />
          </g>
        </g>
      </svg>
    );
  }
}
