import { getAdminBaseUrl } from '../config/environments.js';
import { BaseApiClient } from '../utils/BaseApiClient.js';

export class AdminLeadsApiClient extends BaseApiClient {
  constructor({ request, baseUrl = getAdminBaseUrl() }) {
    super({ baseUrl, request });
  }

  listLeads({ headers, params } = {}) {
    return this.get('/api/v1/admin/students', { headers, params });
  }

  getDashboardStats({ headers } = {}) {
    return this.get('/api/v1/admin/dashboard/stats', { headers });
  }

  async findLeadByEmail(email, { headers } = {}) {
    const matches = await this.searchLeadsByEmail(email, { headers });
    return matches?.[0] ?? null;
  }

  async searchLeadsByEmail(email, { headers } = {}) {
    const response = await this.listLeads({ headers, params: { page: 0, size: 20, search: email } });
    if (!response.ok()) return null;
    const body = await response.json();
    return (body?.data?.content ?? []).filter((lead) => lead.email === email);
  }

  getLeadDetail(leadId, { headers } = {}) {
    return this.get(`/api/v1/admin/students/${encodeURIComponent(leadId)}`, { headers });
  }
}