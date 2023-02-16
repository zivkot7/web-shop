import React, { Component } from "react";
import Button from "../Button/Button";

class CartFooter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { installments, price, total, checkout } = this.props;
    return (
      <div className="cart-footer">
        <span className="subtotal">
          <p>SUBTOTAL</p>
          <span>
            <p className="footer-totalPrice">$ {total}</p>
            <p className="footer-installments">
              OR UP TO {installments} x $ {(total / installments).toFixed(2)}
            </p>
          </span>
        </span>
        <Button
          text="CHECKOUT"
          type="button"
          className="checkoutBtn"
          onClick={checkout}
        />
      </div>
    );
  }
}
export default CartFooter;
