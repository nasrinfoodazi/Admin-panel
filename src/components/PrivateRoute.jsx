import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import PanelLayout from "./Layout";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login" />;
  return (
    <PanelLayout>
      <Outlet />
    </PanelLayout>
  );
};

export default PrivateRoute;
