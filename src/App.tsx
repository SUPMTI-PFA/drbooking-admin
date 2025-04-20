import React from 'react';
import { WindowWidthProvider } from './contexts/WindowWidthContext';
import { ToastContainer } from '@mbs-dev/react-helpers'
import "react-toastify/dist/ReactToastify.css";
import Routing from './Routing';

const App: React.FC = () => {

  return (
    <>
      <WindowWidthProvider>
        <ToastContainer />
        <Routing />
      </WindowWidthProvider>
    </>
  );
};

export default App;