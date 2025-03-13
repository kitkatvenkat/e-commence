import { useEffect, useState } from "react";
import { fetchUserOrders } from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchUserOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    loadOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? <p>No orders found.</p> : orders.map((order) => (
        <div key={order._id} className="border p-4 mb-2 rounded-lg">
          <p>Order ID: {order._id}</p>
          <p>Total: ₹{order.total}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
