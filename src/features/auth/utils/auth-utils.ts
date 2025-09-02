import { secureStorage } from '../../../lib/storage/secure-storage';

export const TOKEN_KEY = 'auth_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export const authUtils = {
  async getToken(): Promise<string | null> {
    return await secureStorage.getItemAsync(TOKEN_KEY);
  },

  async setToken(token: string): Promise<void> {
    await secureStorage.setItemAsync(TOKEN_KEY, token);
  },

  async getRefreshToken(): Promise<string | null> {
    return await secureStorage.getItemAsync(REFRESH_TOKEN_KEY);
  },

  async setRefreshToken(refreshToken: string): Promise<void> {
    await secureStorage.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  },

  async setTokens({ token, refreshToken }: { token: string; refreshToken: string }): Promise<void> {
    await this.setToken(token);
    await this.setRefreshToken(refreshToken);
  },

  async removeToken(): Promise<void> {
    await secureStorage.deleteItemAsync(TOKEN_KEY);
  },

  async removeRefreshToken(): Promise<void> {
    await secureStorage.deleteItemAsync(REFRESH_TOKEN_KEY);
  },

  async clearTokens(): Promise<void> {
    await this.removeToken();
    await this.removeRefreshToken();
  },

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  },
};
