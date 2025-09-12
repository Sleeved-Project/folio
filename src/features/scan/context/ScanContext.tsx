import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ContextScanCardData {
  id?: string;
  frontCardCroppedImage?: string | null;
  backCardCroppedImage?: string | null;
  name?: string;
  potentialMatchedCard?: string;
}

interface ScanContextType {
  scanCardData: ContextScanCardData | null;
  setScanCardData: React.Dispatch<React.SetStateAction<ContextScanCardData | null>>;
  clearScanData: () => void;
}

const ScanContext = createContext<ScanContextType | undefined>(undefined);

export const ScanProvider = ({ children }: { children: ReactNode }) => {
  const [scanCardData, setScanCardData] = useState<ContextScanCardData | null>(null);

  const clearScanData = () => {
    setScanCardData(null);
  };

  return (
    <ScanContext.Provider
      value={{
        scanCardData,
        setScanCardData,
        clearScanData,
      }}
    >
      {children}
    </ScanContext.Provider>
  );
};

export const useScanContext = () => {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error('useScanContext must be used within a ScanProvider');
  }
  return context;
};
