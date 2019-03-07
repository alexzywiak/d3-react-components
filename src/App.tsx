import * as React from "react";
import Svg from "./Svg";
import ZoomSVG from "./ZoomSVG";
import { getData, Data } from "./data";

export default () => {
  const [data, setData] = React.useState<Data[]>(getData());

  const svgProps = {
    svgHeight: 500,
    svgWidth: 960,
    data
  };

  return (
    <div>
      <button onClick={() => setData(getData())}>DATA!</button>
      <div style={{ height: "600px", width: "100%" }}>
        <Svg {...svgProps} />
      </div>
      <div style={{ border: "1px solid black", width: "500px" }}>
        <ZoomSVG />
      </div>
    </div>
  );
};
