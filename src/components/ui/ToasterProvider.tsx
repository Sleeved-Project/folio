import React, { createContext, useContext, useState, ReactNode, useCallback, useRef } from 'react';
import { AccessibilityInfo } from 'react-native';
import Toast from './Toast';

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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((options: ToastOptions) => {
    setToast(options);
    if (options.message) {
      const prefix = options.type ? `${options.type} notification: ` : '';
      AccessibilityInfo.announceForAccessibility(prefix + options.message);
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setToast(null);
      timerRef.current = null;
    }, options.duration ?? 2500);
  }, []);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <ToasterContext.Provider value={{ showToast }}>
      {children}
      <Toast toast={toast} />
    </ToasterContext.Provider>
  );
}
