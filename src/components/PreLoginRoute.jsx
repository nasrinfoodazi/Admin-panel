import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const PreLoginRoute = () => {
  const user = useAuth();
  if (user.token) return <Navigate to="/" />;
  return <Outlet />;
};

export default PreLoginRoute;
