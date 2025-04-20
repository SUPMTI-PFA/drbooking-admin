import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/layouts/Layout";
import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute: React.FC = () => {

    const {userToken} = useAuth();
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
