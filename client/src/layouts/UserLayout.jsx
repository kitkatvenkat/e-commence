import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 p-4 bg-gray-50">
        <Outlet /> {/* Renders User Page Content */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
