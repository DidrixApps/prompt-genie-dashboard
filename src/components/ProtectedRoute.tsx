import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Layout><Outlet /></Layout>;
};

// We need to import Outlet to render child routes
import { Outlet } from 'react-router-dom';
export default ProtectedRoute;