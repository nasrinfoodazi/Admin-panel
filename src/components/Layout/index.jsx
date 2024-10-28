import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";

const PanelLayout = ({ children }) => {
  const { logOut } = useAuth();
  return (
    <>

      <div className="container">
        <Outlet>{children}</Outlet>
      </div>


    </>
  );
};
export default PanelLayout;
