import React from "react";
import { Routes, Route, Navigate } from "react-router";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Login from "@pages/auth/Login";
import Home from "@/pages/home/Home";
import Register from "./pages/auth/Register";
import Ai from "./pages/ai/Ai";
import NotFound from "./pages/notFound/NotFound";
import { useAuth } from "./contexts/AuthContext";
import PublicRoute from "./components/routes/PublicRoute";
import DoctorDetailPage from "./pages/doctors/doctorDetails";
import PatientDetailPage from "./pages/patients/patientDetails";
import DoctorsBySpec from "./pages/specialties/DoctorsBySpec";

const Routing: React.FC = () => {

  const { userToken } = useAuth()

  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route index element={<Home />} />
        <Route path="/doctors/:id" element={<DoctorDetailPage />} />
        <Route path="/doctors-by-specialty/:specialty" element={<DoctorsBySpec />} />
        <Route path="/patients/:id" element={<PatientDetailPage />} />
        {/* <Route path="/" element={<Ai />} /> */}
      </Route>
      <Route  element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
