// We need mongoose to work with our MongoDB database
const mongoose = require("mongoose");

// We create a schema for our products, which is like a blueprint for what a product should look like
const productSchema = new mongoose.Schema(
  {
    // Each product has a name, which must be a string and is required
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    // Each product has a quantity, which must be a number and is required. If not given, it will be 0
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    // Each product has a price, which must be a number and is required. If not given, it will be 0
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    // Each product can have an image, which is a string, but it is not required
    image: {
      type: String,
      required: false,
    },
  },
  {
    // This option automatically adds 'createdAt' and 'updatedAt' fields to our schema
    timestamps: true,
  }
);

// We create a model called "Product" using our schema. A model is like a collection of products.
const Product = mongoose.model("Product", productSchema);

// We export our Product model so we can use it in other parts of our app
module.exports = Product;
