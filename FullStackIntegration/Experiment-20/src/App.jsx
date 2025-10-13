import React from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>🛍️ Redux Shopping Cart</h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <ProductList />
        <Cart />
      </div>
    </div>
  );
}

export default App;
