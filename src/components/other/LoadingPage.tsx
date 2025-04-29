// src/components/LoadingPage.tsx
import React from 'react';
import ActivityIndicator from './AcitivityIndicator';
import Logo from '../../assets/drbooking-logo-1.png';

const LoadingPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-5">
    {/* Logo on top */}
    <img src={Logo} alt="Logo" className=" w-32 h-10 object-contain" />
    {/* Loading spinner */}
    <p>Loading, please wait...</p>
    <ActivityIndicator />
  </div>
);

export default LoadingPage;
