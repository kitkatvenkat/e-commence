import { Link } from "react-router-dom";
import { FaBox, FaListAlt, FaUsers, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import "../styles/Admin.css"; // ✅ Import CSS

const AdminSidebar = ({ isSidebarOpen }) => {
  return (
    <aside className={`admin-sidebar ${isSidebarOpen ? "open" : ""}`}>
      <h2 className="admin-panel-title">Admin Panel</h2>
      <nav className="admin-nav">
        <Link to="/admin" className="admin-link"><FaTachometerAlt /> <span>Dashboard</span></Link>
        <Link to="/admin/products" className="admin-link"><FaBox /> <span>Manage Products</span></Link>
        <Link to="/admin/orders" className="admin-link"><FaListAlt /> <span>Manage Orders</span></Link>
        <Link to="/admin/users" className="admin-link"><FaUsers /> <span>Manage Users</span></Link>
        <button className="admin-logout-btn"><FaSignOutAlt /> <span>Logout</span></button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
