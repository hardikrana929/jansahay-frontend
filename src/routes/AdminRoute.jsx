import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/common/Loader";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loader text="Checking authentication..." />;

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
