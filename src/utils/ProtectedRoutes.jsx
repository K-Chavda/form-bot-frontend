import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const auth = { token: !!localStorage.getItem("token") };

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
