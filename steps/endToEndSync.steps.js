import { expect } from '@playwright/test';
import { AdminLeadsApiClient } from '../clients/AdminLeadsApiClient.js';
import { registrationFieldMapping } from '../models/registration.js';
import { Given, When, Then } from '../support/hooks.js';

When('I search admin leads for the submitted email', async ({ apiContext, apiState }) => {
  const client = new AdminLeadsApiClient({ request: apiContext });
  apiState.matchingLeads = await client.searchLeadsByEmail(apiState.registrationPayload.email, {
    headers: apiState.authHeaders,
  });
});

Then('exactly one lead matches all submitted fields', async ({ apiState }, dataTable) => {
  expect(apiState.matchingLeads, 'Admin lead search did not return a result').not.toBeNull();
  expect(apiState.matchingLeads).toHaveLength(1);
  apiState.matchingLead = apiState.matchingLeads[0];
  const entries = dataTable.hashes();

  for (const { 'public field': publicField, 'admin field': adminField } of entries) {
    expect(registrationFieldMapping[publicField], `Undocumented field mapping: ${publicField}`).toBe(adminField);
    const submitted = apiState.registrationPayload[publicField] ?? '';
    const actual = apiState.matchingLead[adminField] ?? '';
    expect(actual, `field ${publicField}: submitted '${submitted}' vs admin '${actual}'`).toBe(submitted);
  }
});

When('I fetch the matching lead detail', async ({ apiContext, apiState }) => {
  const client = new AdminLeadsApiClient({ request: apiContext });
  apiState.leadDetailResponse = await client.getLeadDetail(apiState.matchingLead.id, {
    headers: apiState.authHeaders,
  });
});
