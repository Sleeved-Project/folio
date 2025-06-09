import { secureStorage } from '../../../lib/storage/secure-storage';

export const TOKEN_KEY = 'auth_token';

export const authUtils = {
  async getToken(): Promise<string | null> {
    return await secureStorage.getItemAsync(TOKEN_KEY);
  },

  async setToken(token: string): Promise<void> {
    await secureStorage.setItemAsync(TOKEN_KEY, token);
  },

  async removeToken(): Promise<void> {
    await secureStorage.deleteItemAsync(TOKEN_KEY);
  },

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  },
};
