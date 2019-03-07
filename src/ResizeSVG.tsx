import React, { useRef } from "react";
import { useContainerSize } from "./hooks/containerSize";

interface SVGProps {
  children: (renderProps: { height: number; width: number }) => JSX.Element;
  margin?: { top: number; right: number; bottom: number; left: number };
}

export default ({
  margin = { top: 20, right: 20, bottom: 30, left: 40 },
  children
}: SVGProps) => {
  const containerDiv = useRef(null);
  const { height: svgHeight, width: svgWidth } = useContainerSize(containerDiv);

  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  return (
    <div ref={containerDiv} style={{ height: "100%", width: "100%" }}>
      {containerDiv ? (
        <svg height={svgHeight} width={svgWidth}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            {children({ height, width })}
          </g>
        </svg>
      ) : null}
    </div>
  );
};
