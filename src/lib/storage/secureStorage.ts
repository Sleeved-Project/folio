import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Fallback for web storage (use in dev only)
// Using localStorage for web as SecureStore is not available
const webStorage = {
  getItemAsync: async (key: string): Promise<string | null> => {
    return localStorage.getItem(key);
  },
  setItemAsync: async (key: string, value: string): Promise<void> => {
    localStorage.setItem(key, value);
  },
  deleteItemAsync: async (key: string): Promise<void> => {
    localStorage.removeItem(key);
  },
};

export const secureStorage = Platform.OS === 'web' ? webStorage : SecureStore;
