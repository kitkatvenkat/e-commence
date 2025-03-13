import axios from "axios";

const API_URL =  "http://localhost:3001/product";
; // Base URL

// ✅ Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/showproduct`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch products";
  }
};

// ✅ Fetch a single product by ID
export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/showproduct/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch product";
  }
};

// ✅ Create a new product (Admin only)
export const createProduct = async (productData, token) => {
  try {
    const response = await axios.post(`${API_URL}/productcreate`, productData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Product creation failed";
  }
};

// ✅ Update an existing product (Admin only)
export const updateProduct = async (productId, updatedData, token) => {
  try {
    const response = await axios.put(`${API_URL}/productupdate/${productId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update product";
  }
};

// ✅ Delete a product (Admin only)
export const deleteProduct = async (productId, token) => {
  try {
    await axios.delete(`${API_URL}/productdelete/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return "Product deleted successfully";
  } catch (error) {
    throw error.response?.data || "Failed to delete product";
  }
};
