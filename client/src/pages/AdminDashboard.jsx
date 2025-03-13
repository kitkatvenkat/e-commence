import { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import { fetchOrders } from "../services/orderService";
import { fetchUsers } from "../services/userService";

const AdminDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const products = await fetchProducts();
        const orders = await fetchOrders();
        const users = await fetchUsers();

        setTotalProducts(products.length);
        setTotalOrders(orders.length);
        setTotalUsers(users.length);
        setRecentOrders(orders.slice(0, 5)); // Show only the latest 5 orders
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };
    loadDashboardData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{totalUsers}</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <h3 className="text-xl font-bold mb-3">Recent Orders</h3>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Total Amount</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {recentOrders.map((order) => (
            <tr key={order._id} className="text-center">
              <td className="border p-2">{order._id}</td>
              <td className="border p-2">{order.user.name}</td>
              <td className="border p-2">₹{order.total}</td>
              <td className="border p-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
