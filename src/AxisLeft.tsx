import * as React from "react";
import * as d3 from "d3";

interface AxisProps {
  height: number;
  width: number;
  scale: d3.ScaleLinear<any, any>;
}

export default class Axis extends React.Component<AxisProps> {
  ref: SVGGElement | null = null;

  componentDidMount() {
    if (this.ref) {
      d3.select(this.ref).call(d3.axisLeft(this.props.scale));
    }
  }

  componentDidUpdate({ scale: prevScale }: AxisProps) {
    if (this.ref) {
      d3.select(this.ref)
        .call(d3.axisLeft(prevScale))
        .transition()
        .call(d3.axisLeft(this.props.scale));
    }
  }

  render() {
    return <g ref={ref => (this.ref = ref)} />;
  }
}
