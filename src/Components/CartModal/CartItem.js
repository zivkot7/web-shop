import React, { Component } from "react";
import Button from "../Button/Button";
import ProductCardItem from "../ProductCardItem/ProductCardItem";
import cssImg from "../../Assets/images/css.png";

class CartItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      style,
      availableSizes,
      id,
      key,
      currencyFormat,
      price,
      quantity,
    } = this.props.product;
    return (
      <div>
        <hr className="header-horizontal" />
        <div key={key} className="cart-product">
          <div className="cart-product-item">
            <img src={cssImg} />
            <div className="product-details">
              <p className="product-title">{title}</p>

              <p className="product-size-style">
                {availableSizes} | {style}
              </p>
              <p className="product-count">Quantity: {quantity}</p>
            </div>
          </div>
          <div className="options">
            <Button
              text="X"
              type="button"
              className="cart-product-optionBtn"
              onClick={() => this.deleteProductFromCart(id)}
            />
            <p>
              {currencyFormat} {price.toFixed(2)}
            </p>
            <span>
              <Button
                text="-"
                className="quantityBtn"
                onClick={() => this.props.onMinus(this.props.product)}
              />
              <Button
                text="+"
                className="quantityBtn"
                onClick={() => this.props.onPlus(this.props.product)}
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
