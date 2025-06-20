import { z } from 'zod';

const configSchema = z.object({
  API_WARDEN_BASE_URL: z.string().url(),
});

const parseBoolean = (value: string | undefined): boolean => {
  return value?.toLowerCase() === 'true';
};

const config = {
  API_ATLAS_BASE_URL: process.env.EXPO_PUBLIC_API_ATLAS_BASE_URL || 'http://localhost:8082/api/v1',
  API_WARDEN_BASE_URL:
    process.env.EXPO_PUBLIC_API_WARDEN_BASE_URL || 'http://localhost:8081/api/v1',
  IS_DEV_MODE: parseBoolean(process.env.EXPO_PUBLIC_IS_DEV_MODE), // Set to true for development mode to skip auth
  GOOGLE_CLIENT_ID: {
    ios: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '',
    android: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || '',
  },
  GOOGLE_REDIRECT_SCHEMA:{
    ios: process.env.EXPO_PUBLIC_GOOGLE_IOS_REDIRECT_SCHEMA || 'com.example.app',
    android: process.env.EXPO_PUBLIC_GOOGLE_REDIRECT_SCHEMA || 'com.example.app',
  }
} as const;

try {
  console.log('config ios:', config.GOOGLE_CLIENT_ID.ios, config.GOOGLE_REDIRECT_SCHEMA.ios);
  configSchema.parse(config);
} catch (error) {
  console.error('Invalid configuration:', error);
  throw new Error('Application configuration is invalid');
}

export { config };
