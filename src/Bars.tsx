import * as React from "react";
import * as d3 from "d3";
import { Data } from "./data";

interface BarProps {
  datum: Data;
  height: number;
  width: number;
  xScale: d3.ScaleBand<any>;
  yScale: d3.ScaleLinear<any, any>;
}

class Bar extends React.Component<BarProps> {
  ref: React.RefObject<SVGRectElement>;

  constructor(props: BarProps) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    const { height, datum, yScale, xScale } = this.props;

    d3.select(this.ref.current)
      .attr("x", xScale(datum.date) || 0)
      .attr("y", yScale(datum.value) || 0)
      .attr("fill", "green")
      .attr("height", 0)
      .transition()
      .attr("height", height - yScale(datum.value));
  }

  componentDidUpdate() {
    const { datum, xScale, yScale, height } = this.props;
    d3.select(this.ref.current)
      .attr("fill", "blue")
      .transition()
      .attr("x", xScale(datum.date) || 0)
      .attr("y", yScale(datum.value) || 0)
      .attr("height", height - yScale(datum.value));
  }

  render() {
    const { xScale } = this.props;
    const attributes = {
      width: xScale.bandwidth()
    };
    return <rect data-testid="bar" {...attributes} ref={this.ref} />;
  }
}

interface BarsProps {
  data: Data[];
  height: number;
  width: number;
  xScale: d3.ScaleBand<any>;
  yScale: d3.ScaleLinear<any, any>;
}

export default class Bars extends React.Component<BarsProps> {
  render() {
    const { data, height, width, xScale, yScale } = this.props;
    const barProps = {
      height,
      width,
      xScale,
      yScale
    };
    const bars = data.map(datum => (
      <Bar key={datum.id} {...barProps} datum={datum} />
    ));
    return <g className="bars">{bars}</g>;
  }
}
