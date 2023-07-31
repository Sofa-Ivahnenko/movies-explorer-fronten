import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLogged }) => {
  return isLogged ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
