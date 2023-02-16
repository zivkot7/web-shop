import React, { Component } from "react";

class CartHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { text } = this.props;
    return (
      <div className="cart-header">
        <div className="cart-length-circle">{text}</div>
        <p>
          <b>Cart</b>
        </p>
      </div>
    );
  }
}
export default CartHeader;
