import React from "react";
import "jest-dom/extend-expect";
import { render } from "react-testing-library";
import BarGraph from "../components/BarGraph";

// Update to mock out ResizeSVG so that height and width values are set
it("renders a bar for each data point", () => {
  const svgHeight = 500;
  const svgWidth = 500;
  const data = [
    { id: 1, date: "9/19/2018", value: 1 },
    { id: 2, date: "11/23/2018", value: 33 }
  ];

  const barProps = {
    svgHeight,
    svgWidth,
    data
  };

  const barProps2 = {
    ...barProps,
    data: [data[0]]
  };

  const { rerender, getAllByTestId, getByTestId } = render(
    <BarGraph {...barProps} />
  );
  expect(getAllByTestId("bar").length).toBe(2);
  expect(getByTestId("bar")).toHaveAttribute("fill", "green");

  rerender(<BarGraph {...barProps2} />);

  expect(getAllByTestId("bar").length).toBe(1);
  expect(getByTestId("bar")).toHaveAttribute("fill", "blue");
});
