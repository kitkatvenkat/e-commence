import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import "../styles/Admin.css"; // ✅ Import CSS

const AdminNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="admin-navbar">
      <button className="menu-btn" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <h2 className="admin-title">Admin Dashboard</h2>

      <div className="admin-profile">
        <span className="admin-user">{user?.name} ({user?.email})</span>
        <button onClick={logout} className="admin-logout">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
