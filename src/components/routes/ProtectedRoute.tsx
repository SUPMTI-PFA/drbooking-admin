import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/layouts/Layout";
import React from "react";
import { Navigate, Outlet } from "react-router";
import LoadingPage from "../other/LoadingPage";

const ProtectedRoute: React.FC = () => {

    const {userToken, init, loading} = useAuth();
    
    if (!init || loading) return <LoadingPage />


    if (!userToken) {
        return <Navigate to="/login" replace />;
    }

    return (
        <Layout>
            <Outlet/>
        </Layout>
    );
};

export default ProtectedRoute;
