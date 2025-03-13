import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaUserCircle, FaSignOutAlt, FaKey, FaListAlt, FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* 🍊 Logo */}
        <Link to="/" className="navbar-logo">Karuppadi Store</Link>

        {/* 🔍 Search Box */}
        <input type="text" placeholder="Search..." className="nav-search" />

        {/* 🌍 Navigation Links */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        {/* 🛒 Cart & Profile */}
        <div className="nav-icons">
          {user?.role === "user" && (
            <Link to="/cart" className="cart-icon">
              <FaShoppingCart />
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </Link>
          )}

          {/* User Profile */}
          {user ? (
            <div className="profile">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="profile-btn">
                <FaUserCircle />
                <span className="user-name">{user.name}</span>
              </button>

              <div className={`profile-dropdown ${dropdownOpen ? "open" : ""}`}>
                <Link to="/profile"><FaUserCircle /> Profile</Link>
                <Link to="/orders"><FaListAlt /> My Orders</Link>
                <Link to="/change-password"><FaKey /> Change Password</Link>
                <button onClick={logout}><FaSignOutAlt /> Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
