import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch products: " + error);
        setLoading(false);
      });
  }, []);

  if (loading) return <h3>Loading products...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div style={{ width: "400px", margin: "auto", textAlign: "center" }}>
      <h2>🛒 Product List</h2>
      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <h4>{p.name}</h4>
          <p>Price: ₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
