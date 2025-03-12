const express = require("express");
const { tokenverify, adminOnly } = require("../middleware/authMiddleware");
const {
    placeOrder,
    getAllOrders,
    getUserOrders,
    updateOrderStatus,
    deleteOrder
} = require("../controllers/orderController");

const orderRouter = express.Router();

// ✅ User places an order from cart
orderRouter.post("/place", tokenverify, placeOrder);

// ✅ Admin gets all orders
orderRouter.get("/all", tokenverify, adminOnly, getAllOrders);

// ✅ User gets their own orders
orderRouter.get("/my-orders", tokenverify, getUserOrders);

// ✅ Admin updates order status
orderRouter.put("/update/:id", tokenverify, adminOnly, updateOrderStatus);

// ✅ Admin deletes an order
orderRouter.delete("/delete/:id", tokenverify, adminOnly, deleteOrder);

module.exports = orderRouter;
    