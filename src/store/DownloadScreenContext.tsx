import React, {createContext, useContext, useState, ReactNode} from 'react';

interface DownloadScreenContextType {
  showDownloadScreen: boolean;
  setShowDownloadScreen: (visible: boolean) => void;
}

const DownloadScreenContext = createContext<DownloadScreenContextType | undefined>(
  undefined
);

interface DownloadScreenProviderProps {
  children: ReactNode;
}

export const DownloadScreenProvider: React.FC<DownloadScreenProviderProps> = ({
  children,
}) => {
  const [showDownloadScreen, setShowDownloadScreen] = useState(false);

  return (
    <DownloadScreenContext.Provider
      value={{showDownloadScreen, setShowDownloadScreen}}>
      {children}
    </DownloadScreenContext.Provider>
  );
};

export const useDownloadScreen = () => {
  const context = useContext(DownloadScreenContext);
  if (context === undefined) {
    throw new Error('useDownloadScreen must be used within a DownloadScreenProvider');
  }
  return context;
};
