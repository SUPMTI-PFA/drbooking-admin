import React from "react";
import { Routes, Route } from "react-router";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Login from "@pages/auth/Login";
import Home from "@/pages/home/Home";
import Register from "./pages/auth/Register";
import Ai from "./pages/ai/Ai";

const Routing: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} /> */}

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Ai />} /> */}
      </Route>
    </Routes>
  );
};

export default Routing;
