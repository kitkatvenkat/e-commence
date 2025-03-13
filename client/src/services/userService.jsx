import axios from "axios";

const API_URL = "http://localhost:3001/api";

// Update User Profile (Requires User ID)
export const updateUserProfile = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/update/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update profile";
  }
};
// Fetch all users (Admin)
export const fetchUsers = async () => {  // ✅ Add this function
    try {
      const response = await axios.get(`${API_URL}/all`);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to fetch users";
    }
  };
export const changeUserPassword = async (userId, passwordData) => {
    try {
      const response = await axios.put(`${API_URL}/change-password/${userId}`, passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to change password";
    }
  };
