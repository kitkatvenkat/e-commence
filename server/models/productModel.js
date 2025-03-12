const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productname: { type: String, required: true },
    price: { type: Number, required: true },
    oldprice: { type: Number },
    description: { type: String },
    image1: { type: String }, // Individual images
    image2: { type: String },
    image3: { type: String },
    image4: { type: String },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    stock: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
