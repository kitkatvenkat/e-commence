const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User Model
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true, default: 1 },
            price: { type: Number, required: true }
        }
    ],
    totalPrice: { type: Number, required: true, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
