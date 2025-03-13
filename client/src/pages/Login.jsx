import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css"; // Import CSS file

const Login = () => {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" }); // Reset message
    try {
      const data = await loginUser(credentials);
      if (data && data.user && data.token) {
        login(data.user, data.token);

        // Check user role and redirect accordingly
        if (data.user.role === "admin") {
          setMessage({ text: "✅ Admin Login Successful! Redirecting...", type: "success" });
          setTimeout(() => navigate("/admin"), 1500);
        } else {
          setMessage({ text: "✅ Login successful! Redirecting...", type: "success" });
          setTimeout(() => navigate("/"), 1500);
        }
      } else {
        setMessage({ text: "❌ Invalid email or password.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: error.response?.data?.message || "❌ Login failed. Try again.", type: "error" });
    }
  };

  return (
    <div className="login-container">
      <div className="login-overlay">
        <h2>Login</h2>
        {message.text && <div className={`alert ${message.type}`}>{message.text}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        <p className="register-text">
          Don't have an account? <Link to="/register" className="register-link">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
