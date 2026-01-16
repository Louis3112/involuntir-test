import { Navigate } from 'react-router-dom';
import { apiService } from '../services/api';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = apiService.isAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;