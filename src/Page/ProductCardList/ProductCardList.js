import React, { Component } from "react";
import ProductCardItem from "../../Components/ProductCardItem/ProductCardItem";
import Button from "../../Components/Button/Button";
import CartHeader from "../../Components/CartModal/CartHeader";
import CartFooter from "../../Components/CartModal/CartFooter";
import CartItem from "../../Components/CartModal/CartItem";

const sizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"];

class ProductCardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: [],
      selectedSize: null,
      cartProducts: [],
      isActive: false,
    };
  }
  hideModal = () => {
    this.setState({
      isActive: !this.state.isActive,
    });
  };
  fetchProductsData = async () => {
    const response = await fetch(
      `https://react-shopping-cart-67954.firebaseio.com/products.json`
    );
    const data = await response.json();
    this.setState({ productsData: data });
    console.log(data);
  };
  componentDidMount() {
    this.fetchProductsData();
  }
  onSelectingSize = (size) => {
    this.setState({ selectedSize: size });
  };
  addToCart = (product) => {
    const isExists = this.state.cartProducts.some((cart) => {
      return cart.id === product.id;
    });
    if (isExists) {
      this.setState({
        cartProducts: this.state.cartProducts?.map((cart) => {
          if (cart.id === product.id) {
            return { ...cart, quantity: cart.quantity + 1 };
          }
          return cart;
        }),
      });
    } else {
      return this.setState({
        cartProducts: [...this.state.cartProducts, { ...product, quantity: 1 }],
      });
    }
  };
  showAllProducts = () => {
    this.setState({ selectedSize: "" });
  };
  deleteProductFromCart = (id) => {
    this.setState(() => ({
      cartProducts: this.state.cartProducts.filter(
        (product) => product.id !== id
      ),
    }));
  };

  onMinusClick = (product) => {
    const isExists = this.state.cartProducts.some((cart) => {
      return cart.id === product.id;
    });
    if (isExists) {
      this.setState({
        cartProducts: this.state.cartProducts?.map((cart) => {
          if (cart.id === product.id && cart.quantity > 1) {
            return { ...cart, quantity: cart.quantity - 1 };
          }
          return cart;
        }),
      });
    } else {
      return this.setState({
        cartProducts: [...this.state.cartProducts, { ...product, quantity: 1 }],
      });
    }
  };
  onCheckout = () => {
    alert("Checkout");
  };
  render() {
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
              onClick={() => this.onSelectingSize(size)}
            />
          ))}
          <Button
            text="Show All"
            className="show-all-btn"
            onClick={this.showAllProducts}
          />
        </div>
        <b>{this.state.productsData.products?.length} Product(s) found</b>
        <div className="products-list">
          {this.state.productsData?.products
            ?.filter((product) => {
              if (this.state.selectedSize) {
                return product.availableSizes.includes(this.state.selectedSize);
              }
              return product;
            })
            .map((product, index) => {
              return (
                <ProductCardItem
                  data={product}
                  key={index}
                  onAddToCart={this.addToCart}
                />
              );
            })}
        </div>
        <Button
          onClick={this.hideModal}
          type="button"
          className="btnCart"
          text={
            <div className="cart-circle-length">
              {this.state.cartProducts?.length}
            </div>
          }
        />
        {this.state.isActive ? (
          <div className="modal">
            <Button text="X" className="hideModal" onClick={this.hideModal} />
            <CartHeader text={this.state.cartProducts?.length} />
            <div className="cart-item-wrapper">
              {this.state.cartProducts.map((product) => (
                <CartItem
                  key={product.key}
                  onPlus={this.addToCart}
                  onMinus={this.onMinusClick}
                  product={product}
                />
              ))}
            </div>
            <CartFooter
              total={this.state.cartProducts
                .reduce((acc, cart) => {
                  return cart.quantity * cart.price + acc;
                }, 0)
                .toFixed(2)}
              installments={10}
              checkout={this.onCheckout}
              price={total / installments}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
export default ProductCardList;
