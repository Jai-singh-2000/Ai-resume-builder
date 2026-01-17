import { Navigate, Outlet } from "react-router-dom";
import Loading from "../pages/Loading";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />; // You can replace this with a spinner later

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
