import React, { createContext, useContext, useState } from 'react';

interface FolioCreationContextType {
  name: string;
  setName: (name: string) => void;
}

const FolioCreationContext = createContext<FolioCreationContextType | undefined>(undefined);

export const FolioCreationProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState('Untitled');

  return (
    <FolioCreationContext.Provider value={{ name, setName }}>
      {children}
    </FolioCreationContext.Provider>
  );
};

export const useFolioCreation = () => {
  const ctx = useContext(FolioCreationContext);
  if (!ctx) throw new Error('useFolioCreation must be used within FolioCreationProvider');
  return ctx;
};
