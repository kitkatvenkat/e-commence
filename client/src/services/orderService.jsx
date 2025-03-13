import axios from "axios";

const API_URL =  "http://localhost:3001/order"; // Base URL

// Place an Order
export const placeOrder = async (orderData, token) => {
  try {
    const response = await axios.post(`${API_URL}/place`, orderData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to place order";
  }
};

// Fetch all orders (Admin)
export const fetchOrders = async () => {  // ✅ Add this function
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch orders";
  }
};





// Fetch User Orders
export const fetchUserOrders = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/my-orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch orders";
  }
};

// Fetch All Orders (Admin Only)
export const fetchAllOrders = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/all`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch all orders";
  }
};

// Update Order Status (Admin Only)
export const updateOrderStatus = async (orderId, status, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/update/${orderId}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update order";
  }
};

// Delete an Order (Admin Only)
export const deleteOrder = async (orderId, token) => {
  try {
    await axios.delete(`${API_URL}/delete/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return "Order deleted successfully";
  } catch (error) {
    throw error.response?.data || "Failed to delete order";
  }
};
