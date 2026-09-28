import { expect } from '@playwright/test';
import { AdminLeadsApiClient } from '../clients/AdminLeadsApiClient.js';
import { AdminAuthApiClient } from '../clients/AdminAuthApiClient.js';
import { validateAgainstSchema } from '../utils/schemaValidator.js';
import { Given, When, Then } from '../support/hooks.js';

const knownSyntheticEmail = 'qa.discovery.20260927@example.invalid';
const knownSyntheticStudentId = 21;

When('I request the first page of admin leads', async ({ apiContext, apiState }) => {
  const client = new AdminLeadsApiClient({ request: apiContext });
  apiState.leadsResponse = await client.listLeads({
    headers: apiState.authHeaders,
    params: { page: 0, size: 20 },
  });
});

When('I request admin leads without credentials', async ({ apiContext, apiState }) => {
  const client = new AdminLeadsApiClient({ request: apiContext });
  apiState.unauthenticatedLeadsResponse = await client.listLeads({ params: { page: 0, size: 1 } });
});

Then('the unauthenticated leads response has status 401', async ({ apiState }) => {
  expect(apiState.unauthenticatedLeadsResponse.status()).toBe(401);
});

Then('the leads response has status 200 and matches the documented schema', async ({ apiState }) => {
  expect(apiState.leadsResponse.status()).toBe(200);
  const body = await apiState.leadsResponse.json();
  const result = await validateAgainstSchema('leads_list.json', body);
  expect(result.errors, JSON.stringify(result.errors)).toEqual([]);
  expect(result.valid).toBe(true);
  expect(body.data.content).toEqual(expect.any(Array));
  apiState.leadsBody = body;
});

Then('the first page includes valid pagination metadata', async ({ apiState }) => {
  expect(apiState.leadsBody.data.page).toBe(0);
  expect(apiState.leadsBody.data.size).toBeGreaterThan(0);
  expect(apiState.leadsBody.data.totalElements).toBeGreaterThanOrEqual(0);
  expect(apiState.leadsBody.data.totalPages).toBeGreaterThanOrEqual(0);
});

When('I search admin leads for the known synthetic email', async ({ apiContext, apiState }) => {
  const client = new AdminLeadsApiClient({ request: apiContext });
  apiState.knownSyntheticLeads = await client.searchLeadsByEmail(knownSyntheticEmail, {
    headers: apiState.authHeaders,
  });
});

Then('the known synthetic lead is returned exactly once', async ({ apiState }) => {
  expect(apiState.knownSyntheticLeads).toHaveLength(1);
});

Then('its reference fields match the submitted test data', async ({ apiState }) => {
  const lead = apiState.knownSyntheticLeads[0];
  expect(lead.id).toBe(knownSyntheticStudentId);
  expect(lead.firstName).toBe('QA Example');
  expect(lead.lastName).toBe('Automation');
  expect(lead.email).toBe(knownSyntheticEmail);
  expect(lead.mobile).toBe('9876543210');
  expect(lead.preferredCountry).toBe('Canada');
});

When('I open the known synthetic lead detail', async ({ apiContext, apiState }) => {
  const client = new AdminLeadsApiClient({ request: apiContext });
  apiState.leadDetailResponse = await client.getLeadDetail(knownSyntheticStudentId, {
    headers: apiState.authHeaders,
  });
});

Then('the lead detail response has status 200 and matches the documented schema', async ({ apiState }) => {
  expect(apiState.leadDetailResponse.status()).toBe(200);
  apiState.leadDetailBody = await apiState.leadDetailResponse.json();
  const result = await validateAgainstSchema('lead_detail.json', apiState.leadDetailBody);
  expect(result.errors, JSON.stringify(result.errors)).toEqual([]);
  expect(result.valid).toBe(true);
});

Then('the detail belongs to the known synthetic registration', async ({ apiState }) => {
  expect(apiState.leadDetailBody.data.id).toBe(knownSyntheticStudentId);
  expect(apiState.leadDetailBody.data.email).toBe(knownSyntheticEmail);
});

When('I request the admin dashboard statistics', async ({ apiContext, apiState }) => {
  const client = new AdminLeadsApiClient({ request: apiContext });
  apiState.dashboardStatsResponse = await client.getDashboardStats({ headers: apiState.authHeaders });
});

Then('the dashboard statistics response matches its documented schema', async ({ apiState }) => {
  expect(apiState.dashboardStatsResponse.status()).toBe(200);
  apiState.dashboardStatsBody = await apiState.dashboardStatsResponse.json();
  const result = await validateAgainstSchema('dashboard_stats.json', apiState.dashboardStatsBody);
  expect(result.errors, JSON.stringify(result.errors)).toEqual([]);
  expect(result.valid).toBe(true);
});

Then('all reported counters are zero or greater', async ({ apiState }) => {
  const counters = Object.values(apiState.dashboardStatsBody.data);
  expect(counters.length).toBeGreaterThan(0);
  for (const count of counters) expect(count).toBeGreaterThanOrEqual(0);
});

When('I request the authenticated admin profile', async ({ apiContext, apiState }) => {
  const client = new AdminAuthApiClient({ request: apiContext });
  apiState.adminProfileResponse = await client.getProfile({ headers: apiState.authHeaders });
});

Then('the profile response matches its documented schema', async ({ apiState }) => {
  expect(apiState.adminProfileResponse.status()).toBe(200);
  apiState.adminProfileBody = await apiState.adminProfileResponse.json();
  const result = await validateAgainstSchema('admin_profile.json', apiState.adminProfileBody);
  expect(result.errors, JSON.stringify(result.errors)).toEqual([]);
  expect(result.valid).toBe(true);
});

Then('the profile email matches the configured admin email', async ({ apiState }) => {
  expect(apiState.adminProfileBody.data.email === process.env.ADMIN_USER).toBe(true);
});