import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';

export interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToasterContextType {
  showToast: (options: ToastOptions) => void;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export function useToaster() {
  const ctx = useContext(ToasterContext);
  if (!ctx) throw new Error('useToaster must be used within a ToasterProvider');
  return ctx;
}

export function ToasterProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastOptions | null>(null);

  const showToast = useCallback((options: ToastOptions) => {
    setToast(options);
    setTimeout(() => setToast(null), options.duration ?? 2500);
  }, []);

  return (
    <ToasterContext.Provider value={{ showToast }}>
      {children}
      <Toast toast={toast} />
    </ToasterContext.Provider>
  );
}

// Importer Toast ici (voir étape suivante)
import Toast from './Toast';
