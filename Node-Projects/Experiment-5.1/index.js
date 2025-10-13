const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Define Schema
const productSchema = new mongoose.Schema({
  itemCode: {
    type: Number,
    required: true,
    min: 1,
    max: 1000,
    unique: true
  },
  itemName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 1
  }
});

// Create  Model
const Product = mongoose.model('products', productSchema);

app.get('/api/product', async (req, res) => {
    console.log(req.method + req.url);
    try {
        const products =  await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/product/:category', async (req, res) => {
    console.log(req.method + req.url);
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/product', async (req, res) => {
    console.log(req.method + req.url);
    const {itemCode, itemName, category, price} = req.body;
    if (!itemCode || !itemName || !category || !price) {
        res.status(404).json("Product  attributes missing");
        return
    }

    // Create product object
    const newProduct = new Product({
        itemCode: Number(itemCode),
        itemName,
        category,
        price: Number(price)
    });

    try {
        await newProduct.save();    
        res.status(201).json({
            status: "success",
            data: newProduct
        });
        // res.send(`Record Saved.`);
    } catch (err) {
        if (err.code === 11000) {
            res.json({error: "Product number already exists."});
        } else {
            res.json({error: err.message});
        }
    }
});

app.put('/api/product/:id', async (req, res) => {
    console.log(req.method + req.url);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated document
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update product: ' + error.message });
  }
});

app.delete('/api/product/:id', async (req, res) => {
    console.log(req.method + req.url);
    try {
        const deleted = Product.findByIdAndDelete(req.params.id);
        if (deleted) {
            res.status(200).json({message: "deleted successdully"})
        } else {
            res.status(501).json({error: "Something went wrong"});
        }
    } catch(err) {
        res.status(503).json({error: err.message});
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server Started at http://locahost:${port}`);
})