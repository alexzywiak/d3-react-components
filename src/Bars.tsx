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
    const { height, datum, yScale } = this.props;
    d3.select(this.ref)
      .datum(this.props.datum)
      .attr("fill", "green")
      .attr("height", 0)
      .transition()
      .attr("height", height - yScale(datum.value));
  }

  componentDidUpdate(prevProps: BarProps) {
    const { datum, xScale, yScale, height } = this.props;
    d3.select(this.ref)
      .attr("fill", "blue")
      .attr("x", prevProps.xScale(prevProps.datum.date) as any)
      .attr("y", prevProps.yScale(prevProps.datum.value) as any)
      .attr("height", height - prevProps.yScale(prevProps.datum.value))
      .transition()
      .attr("x", xScale(datum.date) as any)
      .attr("y", yScale(datum.value) as any)
      .attr("height", height - yScale(datum.value));
  }

  componentWillUnmount() {
    const { datum, xScale, yScale, height } = this.props;
    d3.select(this.ref)
      .attr("fill", "red")
      .attr("x", xScale(datum.date) as any)
      .attr("y", yScale(datum.value) as any)
      .attr("height", height - yScale(datum.value))
      .transition()
      .attr("height", 0);
  }

  render() {
    const { datum, height, xScale, yScale } = this.props;
    const attributes = {
      className: `bar ${datum.id}`,
      x: xScale(datum.date),
      y: yScale(datum.value),
      width: xScale.bandwidth()
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
