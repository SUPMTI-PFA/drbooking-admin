import React from 'react';
import { WindowWidthProvider } from './contexts/WindowWidthContext';
import { ToastContainer } from '@mbs-dev/react-helpers'
import "react-toastify/dist/ReactToastify.css";
import Routing from './Routing';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {

  return (
    <>
      <AuthProvider>
        <WindowWidthProvider>
          <ToastContainer />
          <Routing />
        </WindowWidthProvider>
      </AuthProvider>
    </>
  );
};

export default App;