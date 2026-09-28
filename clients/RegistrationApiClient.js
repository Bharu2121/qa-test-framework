import { getPublicApiToken, getPublicBaseUrl } from '../config/environments.js';
import { BaseApiClient } from '../utils/BaseApiClient.js';

export class RegistrationApiClient extends BaseApiClient {
  constructor({ request, baseUrl = getPublicBaseUrl(), token = getPublicApiToken() }) {
    super({ baseUrl, request });
    this.token = token;
  }

  submitRegistration(payload) {
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : undefined;
    return this.post('/api/v1/students/register', { data: payload, headers });
  }
}