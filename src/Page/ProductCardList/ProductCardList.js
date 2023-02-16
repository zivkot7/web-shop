import React, { useState, useEffect } from "react";
import ProductCardItem from "../../Components/ProductCardItem/ProductCardItem";
import Button from "../../Components/Button/Button";
import CartHeader from "../../Components/CartModal/CartHeader";
import CartFooter from "../../Components/CartModal/CartFooter";
import CartItem from "../../Components/CartModal/CartItem";

const sizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"];

const ProductCardList = (props) => {
  const [productsData, setProductsData] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const hideModal = () => {
    setIsActive(!isActive);
  };
  const fetchProductsData = async () => {
    const response = await fetch(
      `https://react-shopping-cart-67954.firebaseio.com/products.json`
    );
    const data = await response.json();
    setProductsData(data);
    console.log(data);
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  const onSelectingSize = (size) => {
    setSelectedSize(size);
  };
  const addToCart = (product) => {
    const isExists = cartProducts.some((cart) => {
      return cart.id === product.id;
    });
    if (isExists) {
      setCartProducts(
        cartProducts?.map((cart) => {
          if (cart.id === product.id) {
            return { ...cart, quantity: cart.quantity + 1 };
          }
          return cart;
        })
      );
    } else {
      return setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
    }
  };
  const showAllProducts = () => {
    setSelectedSize("");
  };
  const deleteProductFromCart = (id) => {
    setCartProducts(cartProducts.filter((product) => product.id !== id));
  };

  const onMinusClick = (product) => {
    const isExists = cartProducts.some((cart) => {
      return cart.id === product.id;
    });
    if (isExists) {
      setCartProducts(
        cartProducts?.map((cart) => {
          if (cart.id === product.id && cart.quantity > 1) {
            return { ...cart, quantity: cart.quantity - 1 };
          }
          return cart;
        })
      );
    } else {
      return setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
    }
  };
  const onCheckout = () => {
    alert("Checkout");
  };

  return (
    <div className="shopping-cart-page">
      <div className="sizes-sidebar">
        <h3>Sizes: </h3>
        {sizes.map((size) => (
          <Button
            key={size}
            type="button"
            text={size}
            className="btnSizes"
            onClick={() => onSelectingSize(size)}
          />
        ))}
        <Button
          text="Show All"
          className="show-all-btn"
          onClick={showAllProducts}
        />
      </div>
      <b>{productsData.products?.length} Product(s) found</b>
      <div className="products-list">
        {productsData?.products
          ?.filter((product) => {
            if (selectedSize) {
              return product.availableSizes.includes(selectedSize);
            }
            return product;
          })
          .map((product, index) => {
            return (
              <ProductCardItem
                data={product}
                key={index}
                onAddToCart={addToCart}
              />
            );
          })}
      </div>
      <Button
        onClick={hideModal}
        type="button"
        className="btnCart"
        text={<div className="cart-circle-length">{cartProducts?.length}</div>}
      />
      {isActive ? (
        <div className="modal">
          <Button text="X" className="hideModal" onClick={hideModal} />
          <CartHeader text={cartProducts?.length} />
          <div className="cart-item-wrapper">
            {cartProducts.map((product) => (
              <CartItem
                key={product.key}
                onPlus={addToCart}
                onMinus={onMinusClick}
                product={product}
                onDelete={deleteProductFromCart}
              />
            ))}
          </div>
          <CartFooter
            total={cartProducts
              .reduce((acc, cart) => {
                return cart.quantity * cart.price + acc;
              }, 0)
              .toFixed(2)}
            installments={10}
            checkout={onCheckout}
            price={props.total / props.installments}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProductCardList;
