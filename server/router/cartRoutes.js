const express = require("express");
const { tokenverify } = require("../middleware/authMiddleware");
const {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
} = require("../controllers/cartController");

const cartRouter = express.Router();

// ✅ Add to Cart
cartRouter.post("/add", tokenverify, addToCart);

// ✅ Get User's Cart
cartRouter.get("/", tokenverify, getCart);

// ✅ Update Cart Item Quantity
cartRouter.put("/update", tokenverify, updateCartItem);

// ✅ Remove an Item from the Cart
cartRouter.delete("/remove/:productId", tokenverify, removeCartItem);

// ✅ Clear the Cart
cartRouter.delete("/clear", tokenverify, clearCart);

module.exports = cartRouter;
