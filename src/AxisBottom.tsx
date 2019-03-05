import * as React from "react";
import * as d3 from "d3";

interface AxisProps {
  height: number;
  scale: d3.ScaleBand<any>;
}

export default class Axis extends React.Component<AxisProps> {
  ref: React.RefObject<SVGGElement>;

  constructor(props: AxisProps) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    if (this.ref.current) {
      d3.select(this.ref.current).call(d3.axisBottom(this.props.scale));
    }
  }

  componentDidUpdate() {
    if (this.ref.current) {
      d3.select(this.ref.current)
        .transition()
        .call(d3.axisBottom(this.props.scale));
    }
  }

  render() {
    return <g transform={`translate(0,${this.props.height})`} ref={this.ref} />;
  }
}
