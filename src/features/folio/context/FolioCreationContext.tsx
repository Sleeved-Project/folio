import React, { createContext, useContext, useState, useCallback } from 'react';

interface FolioCreationContextType {
  name: string;
  setName: (name: string) => void;
  reset: () => void;
}

const FolioCreationContext = createContext<FolioCreationContextType | undefined>(undefined);

export const FolioCreationProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState('Untitled');

  const reset = useCallback(() => setName('Untitled'), []);

  return (
    <FolioCreationContext.Provider value={{ name, setName, reset }}>
      {children}
    </FolioCreationContext.Provider>
  );
};

export const useFolioCreation = () => {
  const ctx = useContext(FolioCreationContext);
  if (!ctx) throw new Error('useFolioCreation must be used within FolioCreationProvider');
  return ctx;
};
