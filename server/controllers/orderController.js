const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

// ✅ Place Order (From Cart)
const placeOrder = async (req, res) => {
    try {
        const { paymentMethod, address } = req.body;

        // Find the user's cart
        const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Create new order
        const newOrder = new Order({
            user: req.user._id,
            items: cart.items,
            totalAmount: cart.totalPrice,
            paymentMethod,
            address
        });

        await newOrder.save();

        // Clear the cart after placing an order
        await Cart.findOneAndDelete({ user: req.user._id });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get All Orders (Admin Only)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email").populate("items.product", "productname price");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get Orders for a Specific User
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate("items.product", "productname price");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Update Order Status (Admin Only)
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status || order.status;
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Delete an Order (Admin Only)
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { placeOrder, getAllOrders, getUserOrders, updateOrderStatus, deleteOrder };
