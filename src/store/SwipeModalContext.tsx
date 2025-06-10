import React, {createContext, useContext, useState, ReactNode} from 'react';

interface SwipeModalContextType {
  isModalVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
}

const SwipeModalContext = createContext<SwipeModalContextType | undefined>(
  undefined,
);

interface SwipeModalProviderProps {
  children: ReactNode;
}

export const SwipeModalProvider: React.FC<SwipeModalProviderProps> = ({
  children,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  return (
    <SwipeModalContext.Provider value={{isModalVisible, showModal, hideModal}}>
      {children}
    </SwipeModalContext.Provider>
  );
};

export const useSwipeModal = () => {
  const context = useContext(SwipeModalContext);
  if (context === undefined) {
    throw new Error('useSwipeModal must be used within a SwipeModalProvider');
  }
  return context;
};
