import axios from "axios";

const API_URL =  "http://localhost:3001/api"; // Base URL

// User Login
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post("http://localhost:3001/api/login", credentials);
    return response.data; // Returns user data and token
  } catch (error) {
    throw error.response?.data || "Login failed";
  }
};

// User Registration
export const registerUser = async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/api/createuser", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Registration failed";
  }
};

// Logout (Clears token from localStorage)
export const logoutUser = () => {
  localStorage.removeItem("user");
};
