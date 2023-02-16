import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { className, onClick, text, type, style } = this.props;
    return (
      <button style={style} className={className} type={type} onClick={onClick}>
        {text}
      </button>
    );
  }
}

export default Button;
