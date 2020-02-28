import * as React from "react";
import BarGraph from "./components/BarGraph";
import { getData, Data } from "./data";
import ZoomieCircle from "./components/ZoomieCircle";

export default () => {
  const [data, setData] = React.useState<Data[]>(getData());

  const barGraphProps = {
    svgHeight: 500,
    svgWidth: 960,
    data
  };

  return (
    <div>
      <button onClick={() => setData(getData())}>DATA!</button>
      <div style={{ height: "600px", width: "100%" }}>
        <BarGraph {...barGraphProps} />
      </div>
      <div style={{ border: "1px solid black", width: "500px" }}>
        <ZoomieCircle />
      </div>
    </div>
  );
};
