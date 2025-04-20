import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

const WindowWidthContext = createContext<{
  windowWidth: number;
}>({
  windowWidth: 0
});

export const useWindowWidthContext = () => useContext(WindowWidthContext);

export const WindowWidthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <WindowWidthContext.Provider value={{ windowWidth }}>
      {children}
    </WindowWidthContext.Provider>
  );
};