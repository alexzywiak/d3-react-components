import * as React from "react";
import Svg from "./Svg";
import { getData, Data } from "./data";

class App extends React.Component<{}, { data: Data[] }> {
  data: Data[] = [];
  constructor(props: {}) {
    super(props);
    this.state = { data: getData() };
  }
  handleClick = () => {
    this.setState({
      data: getData()
    });
  };

  render() {
    const { data } = this.state;
    const svgProps = {
      height: 500,
      width: 960,
      data
    };

    return (
      <div>
        <button onClick={this.handleClick}>DATA!</button>
        <Svg {...svgProps} />
      </div>
    );
  }
}

export default App;
