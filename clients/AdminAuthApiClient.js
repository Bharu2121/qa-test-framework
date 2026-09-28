import { getAdminBaseUrl } from '../config/environments.js';
import { AuthManager } from '../utils/authManager.js';
import { BaseApiClient } from '../utils/BaseApiClient.js';

export class AdminAuthApiClient extends BaseApiClient {
  constructor({ request, baseUrl = getAdminBaseUrl() }) {
    super({ baseUrl, request });
    this.authManager = new AuthManager(this);
  }

  async login(username, password) {
    const result = await this.authManager.login(username, password);
    return { token: result.token, raw: result.raw };
  }

  getAuthHeaders(token) {
    return this.authManager.getAuthHeaders(token);
  }

  getProfile({ headers } = {}) {
    return this.get('/api/v1/auth/profile', { headers });
  }
}