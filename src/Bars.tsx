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
  ref: SVGRectElement | null = null;
  componentDidMount() {
    d3.select(this.ref).datum(this.props.datum);
  }

  render() {
    const { datum, height, xScale, yScale } = this.props;
    const attributes = {
      className: "bar",
      x: xScale(datum.date),
      y: yScale(datum.value),
      width: xScale.bandwidth(),
      height: height - yScale(datum.value),
      fill: "steelblue"
    };
    return <rect {...attributes} ref={ref => (this.ref = ref)} />;
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
    const bars = data.map(datum => {
      return <Bar key={datum.id} {...barProps} datum={datum} />;
    });
    return <g className="bars">{bars}</g>;
  }
}
