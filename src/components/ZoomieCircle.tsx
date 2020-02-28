import React from "react";
import ZoomSVG from "./ZoomSVG";
import Circle from "./Circle";

interface ZoomieCircleProps {}
const ZoomieCircle = (props: ZoomieCircleProps) => {
  return (
    <ZoomSVG>
      <Circle />
    </ZoomSVG>
  );
};

ZoomieCircle.displayName = "ZoomieCircle";
export default ZoomieCircle;
