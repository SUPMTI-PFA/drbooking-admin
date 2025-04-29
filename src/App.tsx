import React from 'react';
import { WindowWidthProvider } from './contexts/WindowWidthContext';
import { ToastContainer } from '@mbs-dev/react-helpers'
import "react-toastify/dist/ReactToastify.css";
import Routing from './Routing';
import { AuthProvider } from './contexts/AuthContext';
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter } from 'react-router';

const App: React.FC = () => {

  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <WindowWidthProvider>
          <PrimeReactProvider>
            <Routing />
          </PrimeReactProvider>
        </WindowWidthProvider>
      </AuthProvider>
    </>
  );
};

export default App;