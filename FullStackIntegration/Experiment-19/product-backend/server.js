const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
// add specofic origin in cors with port    

 app.use(cors({ origin: 'http://localhost:5172/' }));

// Sample product data
const products = [
  { id: 1, name: "Laptop", price: 75000 },
  { id: 2, name: "Headphones", price: 2500 },
  { id: 3, name: "Keyboard", price: 1500 },
];

// API route
app.get("/api/products", (req, res) => {
  res.json(products);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
