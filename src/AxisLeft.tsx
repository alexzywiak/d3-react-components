import * as React from "react";
import * as d3 from "d3";

interface AxisProps {
  scale: d3.ScaleLinear<any, any>;
}

export default class Axis extends React.Component<AxisProps> {
  ref: React.RefObject<SVGGElement>;

  constructor(props: AxisProps) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    if (this.ref.current) {
      d3.select(this.ref.current).call(d3.axisLeft(this.props.scale));
    }
  }

  componentDidUpdate() {
    if (this.ref.current) {
      d3.select(this.ref.current)
        .transition()
        .call(d3.axisLeft(this.props.scale));
    }
  }

  render() {
    return <g ref={this.ref} />;
  }
}
