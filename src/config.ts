import { z } from 'zod';

const configSchema = z.object({
  API_WARDEN_BASE_URL: z.string().url(),
});

const config = {
  API_ATLAS_BASE_URL: process.env.EXPO_PUBLIC_API_ATLAS_BASE_URL || 'http://localhost:8082/api/v1',
  API_WARDEN_BASE_URL:
    process.env.EXPO_PUBLIC_API_WARDEN_BASE_URL || 'http://localhost:8081/api/v1',
  IS_DEV_MODE: process.env.EXPO_PUBLIC_IS_DEV_MODE, // Set to true for development mode to skip auth
} as const;

try {
  configSchema.parse(config);
} catch (error) {
  console.error('Invalid configuration:', error);
  throw new Error('Application configuration is invalid');
}

export { config };
