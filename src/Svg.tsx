import * as React from "react";
import * as d3 from "d3";
import { Data } from "./data";
import AxisBottom from "./AxisBottom";
import AxisLeft from "./AxisLeft";
import Bars from "./Bars";

interface SVGProps {
  height: number;
  width: number;
  data: Data[];
}

class App extends React.Component<SVGProps> {
  render() {
    const { height, width, data } = this.props;

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const svgWidth = width - margin.left - margin.right;
    const svgHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .range([0, svgWidth])
      .padding(0.1);

    const yScale = d3.scaleLinear().range([svgHeight, 0]);

    xScale.domain(data.map(d => d.date));
    yScale.domain([0, d3.max(data, d => d.value) || 0]);

    const axisBottomProps = {
      height: svgHeight,
      width: svgWidth,
      scale: xScale
    };
    const axisLeftProps = { height: svgHeight, width: svgWidth, scale: yScale };

    const barProps = {
      height: svgHeight,
      width: svgWidth,
      xScale,
      yScale,
      data
    };

    return (
      <svg height={height} width={width}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom {...axisBottomProps} />
          <AxisLeft {...axisLeftProps} />
          <Bars {...barProps} />
        </g>
      </svg>
    );
  }
}

export default App;
