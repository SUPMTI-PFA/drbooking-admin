// src/components/routes/PublicRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import LoadingPage from '../other/LoadingPage';


const PublicRoute: React.FC = () => {

  const { userToken, loading } = useAuth();

  if (loading) return <LoadingPage />;

  return userToken
    ? <Navigate to="/" replace />
    : <Outlet />;
};

export default PublicRoute;
