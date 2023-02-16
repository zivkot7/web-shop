import React from "react";
import Button from "../Button/Button";
import cssImg from "../../Assets/images/css.png";

const CartItem = (props) => {
  const {
    title,
    style,
    availableSizes,
    id,
    key,
    currencyFormat,
    price,
    quantity,
  } = props.product;
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
            onClick={() => props.onDelete(id)}
          />
          <p>
            {currencyFormat} {(quantity * price).toFixed(2)}
          </p>
          <span>
            <Button
              text="-"
              className="quantityBtn"
              onClick={() => props.onMinus(props.product)}
            />
            <Button
              text="+"
              className="quantityBtn"
              onClick={() => props.onPlus(props.product)}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
