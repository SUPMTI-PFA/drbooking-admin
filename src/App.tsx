import React from 'react';
import { WindowWidthProvider } from './contexts/WindowWidthContext';
import { ToastContainer } from '@mbs-dev/react-helpers'
import "react-toastify/dist/ReactToastify.css";
import Routing from './Routing';
import { AuthProvider } from './contexts/AuthContext';
import { PrimeReactProvider } from 'primereact/api';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { BaseProvider } from './contexts/baseContext';


const App: React.FC = () => {

  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient} >
        <ToastContainer />
        <AuthProvider>
          <BaseProvider>
            <WindowWidthProvider>
              <PrimeReactProvider>
                <Routing />
              </PrimeReactProvider>
            </WindowWidthProvider>
          </BaseProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;