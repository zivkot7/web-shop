import React, { Component } from "react";
import "./App.css";
import ProductCardList from "./Page/ProductCardList/ProductCardList";
import Button from "./Components/Button/Button";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ProductCardList />
      </div>
    );
  }
}

export default App;
