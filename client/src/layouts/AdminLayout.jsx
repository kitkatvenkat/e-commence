import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";
import "../styles/Admin.css";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* ✅ Navbar */}
      <AdminNavbar 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
      />

      <div className="admin-main">
        {/* ✅ Sidebar */}
        <AdminSidebar isSidebarOpen={isSidebarOpen} />

        {/* ✅ Main Content */}
        <main className="admin-content">
          <Outlet />  {/* ✅ This should now work! */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
