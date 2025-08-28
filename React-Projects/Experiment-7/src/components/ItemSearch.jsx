import { useState } from "react";

export default function ProductSearch() {
  const products = ["Sports Shoes", "Shirt", "Trousers", "Mobile"];
  const [query, setQuery] = useState("");

  const filteredProduct = products.filter (
    p => p.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-item-container">
      <h2>Product Search</h2>
      
      <input type="text" placeholder="Search products..." 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
      />

      {
        filteredProduct.length === 0 ?
        ( <p>No products found.</p> )  
        : null
      }  
      <ul>
        {filteredProduct.map((a, i) => <li key={i}>{a}</li>)}
      </ul>
    </div>
  );
}
