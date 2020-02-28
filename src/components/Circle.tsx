import * as React from "react";
import * as d3 from "d3";

function dragstarted(this: any, d: any) {
  d3.event.sourceEvent.stopPropagation();
  d3.select(this).classed("dragging", true);
}

function dragged(this: any, d: any) {
  d3.select(this)
    .attr("cx", d3.event.x)
    .attr("cy", d3.event.y);
}

function dragended(this: any, d: any) {
  d3.select(this).classed("dragging", false);
}

export default class Circle extends React.Component {
  ref: Element | null = null;
  componentDidMount() {
    const drag = d3
      .drag()
      .subject(d => {
        return d3.select(this.ref);
      })
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    if (this.ref) {
      d3.select(this.ref)
        .attr("fill", "red")
        .attr("r", 15)
        .attr("cx", 50)
        .attr("cy", 50)
        .call(drag as any);
    }
  }
  render() {
    return <circle ref={ref => (this.ref = ref)} />;
  }
}
