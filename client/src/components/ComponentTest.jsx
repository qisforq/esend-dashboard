import React, { Component } from "react";
import ReactDOM from "react-dom";

class ComponentTest extends Component {
  constructor() {
    super();

    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState(() => {
      return {
        value
      };
    });
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder={"Amount in USD"}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default ComponentTest;

const wrapper = document.getElementById("container-test");
wrapper ? ReactDOM.render(<ComponentTest />, wrapper) : false;