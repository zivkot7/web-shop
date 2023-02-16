import React from "react";
import Button from "../Button/Button";
import cssImg from "../../Assets/images/css.png";

const ProductCardItem = (props) => {
  const { title, price, currencyFormat, installments } = props.data;
  const decimal = (props.data.price % 1) * 100;
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
        onClick={() => props.onAddToCart(props.data)}
      />
    </div>
  );
};

export default ProductCardItem;
