export class AuthManager {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async login(username, password) {
    const response = await this.apiClient.post('/api/v1/auth/login', {
      data: { email: username, password },
    });
    if (!response.ok()) return { token: null, raw: response };

    const body = await response.json();
    return { token: body?.data?.token ?? null, raw: response };
  }

  getAuthHeaders(token) {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  isTokenValid(token) {
    if (typeof token !== 'string' || token.length === 0) return false;
    const payload = token.split('.')[1];
    if (!payload) return true;

    try {
      const claims = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
      return typeof claims.exp !== 'number' || claims.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}