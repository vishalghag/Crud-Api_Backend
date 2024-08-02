// We need express to create a web server and mongoose to work with MongoDB
const express = require("express");
const mongoose = require("mongoose");

// We are importing the Product model we created earlier
const Product = require("./models/products.model");

// We create an express app
const app = express();

// This line helps our app to read JSON data
app.use(express.json());

// When someone visits the home page, we send a greeting message
app.get("/", (req, res) => {
  res.send("Hello From Node js by vishal ghag");
});

// When someone visits /api/products, we get all the products from the database
app.get("/api/products", async (req, res) => {
  try {
    // We find all products in the database
    const products = await Product.find({});
    // We send back the products we found with a status of 200 (OK)
    res.status(200).json(products);
  } catch (error) {
    // If something goes wrong, we send back an error message with a status of 500 (Server Error)
    res.status(500).json({ message: error.message });
  }
});

// When someone visits /api/products/:id, we get a product by its ID
app.get("/api/product/:id", async (req, res) => {
  try {
    // We get the ID from the URL
    const { id } = req.params;
    // We find the product in the database by its ID
    const product = await Product.findById(id);
    // We send back the product we found with a status of 200 (OK)
    res.status(200).json(product);
  } catch (error) {
    // If something goes wrong, we send back an error message with a status of 500 (Server Error)
    res.status(500).json({ message: error.message });
  }
});

// When someone sends data to /api/products, we add a new product to the database
app.post("/api/products", async (req, res) => {
  try {
    // We create a new product in the database with the data we received
    const data = await Product.create(req.body);
    // We send back the new product we created with a status of 200 (OK)
    res.status(200).json(data);
  } catch (error) {
    // If something goes wrong, we send back an error message with a status of 500 (Server Error)
    res.status(500).json({ message: error.message });
  }
});

// Route to update a product by its ID
app.put("/api/product/:id", async (req, res) => {
  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Find the product by its ID and update it with the request body data
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // If no product is found, send a 404 status with a 'Product not found' message
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Send back the updated product with a 200 status
    res.status(200).json(product);
  } catch (error) {
    // If something goes wrong, send back an error message with a 500 status (Server Error)
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a product by its ID
app.delete("/api/product/:id", async (req, res) => {
  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Find the product by its ID and delete it
    const product = await Product.findByIdAndDelete(id);

    // If no product is found, send a 404 status with a 'Product not found' message
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Send back a success message with a 200 status
    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    // If something goes wrong, send back an error message with a 500 status (Server Error)
    res.status(500).json({ message: error.message });
  }
});

// We connect to the MongoDB database using mongoose
mongoose
  .connect(
    "mongodb+srv://vishalghag47:vishalvj12345@crudapi.ozw6hqk.mongodb.net/?retryWrites=true&w=majority&appName=CrudApi"
  )
  .then(() => {
    // If connection is successful, we log a message
    console.log("Connected to DB");
    // We start the server on port 8000 and log a message
    app.listen(8000, () => {
      console.log("server is running on 8000");
    });
  })
  .catch((err) => {
    // If connection fails, we log an error message
    console.log(err + "Something went wrong");
  });
