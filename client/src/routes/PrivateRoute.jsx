import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children, adminOnly }) => {
  const { user } = useContext(AuthContext);

  // Redirect if user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect non-admins from admin-only pages
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
