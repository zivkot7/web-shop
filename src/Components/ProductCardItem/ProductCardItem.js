import React, { Component } from "react";
import Button from "../Button/Button";
import cssImg from "../../Assets/images/css.png";

class ProductCardItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, price, currencyFormat, installments } = this.props.data;
    const decimal = (this.props.data.price % 1) * 100;
    return (
      <div className="product">
        <img src={cssImg} />
        <b>{title}</b>
        <hr className="title-horizontal-line" />
        <p>
          <span className="currencySymbol">{currencyFormat}</span>{" "}
          <span className="firstDigits">{price.toFixed()}</span>
          <span>.{decimal.toFixed()}</span>
        </p>
        <br />
        <span style={{ fontWeight: "normal", color: "grey" }}>
          or {installments} x<b>${(price / installments).toFixed(2)}</b>
        </span>
        <Button
          text="Add to cart"
          type="button"
          className="add-to-cartBtn"
          onClick={() => this.props.onAddToCart(this.props.data)}
        />
      </div>
    );
  }
}
export default ProductCardItem;
