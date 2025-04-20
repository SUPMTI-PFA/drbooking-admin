import Layout from "@/layouts/Layout";
import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute: React.FC = () => {
    // const token = localStorage.getItem("mbs_user_token");

    // if (!token) {
    //     return <Navigate to="/login" replace />;
    // }

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default ProtectedRoute;
