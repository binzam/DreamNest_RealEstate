import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store/store';

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
