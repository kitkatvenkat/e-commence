import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css"; // Import CSS file

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" }); // Reset message
    try {
      await registerUser(user);
      setMessage({ text: "✅ Registration successful! Redirecting to login...", type: "success" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage({ text: error.response?.data?.message || "❌ Registration failed. Try again.", type: "error" });
    }
  };

  return (
    <div className="register-container">
      {/* Overlay for better readability */}
      <div className="register-overlay">
        <h2>Register</h2>
        {message.text && <div className={`alert ${message.type}`}>{message.text}</div>}
        <form onSubmit={handleSubmit} className="register-form">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
        <p className="login-text">
          Already have an account? <Link to="/login" className="login-link">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
