import { expect, test } from '@playwright/test';
import { AdminAuthApiClient } from '../clients/AdminAuthApiClient.js';
import { validateAgainstSchema } from '../utils/schemaValidator.js';
import { Given, When, Then } from '../support/hooks.js';

Given('I log into the admin API with configured credentials', async ({ apiContext, apiState }) => {
  const username = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASS;
  test.skip(!username || !password, 'Set ADMIN_USER and ADMIN_PASS to run admin API scenarios.');

  const client = new AdminAuthApiClient({ request: apiContext });
  apiState.adminAuthClient = client;
  apiState.loginResult = await client.login(username, password);
  apiState.loginBody = apiState.loginResult.raw.ok() ? await apiState.loginResult.raw.json() : null;
  apiState.authHeaders = client.getAuthHeaders(apiState.loginResult.token);
});

Given('the admin login API is replaced by a deterministic mock', async ({ apiState }) => {
  apiState.mockLoginBody = { success: false, message: 'Invalid email or password ' };
  const mockRequest = {
    fetch: async (url, options) => {
      apiState.mockLoginRequest = { url, options };
      return {
        status: () => 401,
        ok: () => false,
        json: async () => apiState.mockLoginBody,
      };
    },
  };
  apiState.mockAdminAuthClient = new AdminAuthApiClient({ request: mockRequest });
});

When('I submit invalid mock admin credentials', async ({ apiState }) => {
  apiState.mockLoginResult = await apiState.mockAdminAuthClient.login(
    'qa.mock.admin@example.invalid',
    'not-a-real-password',
  );
});

Then('the admin login response has status 200 and a documented token', async ({ apiState }) => {
  expect(apiState.loginResult.raw.status()).toBe(200);
  expect(apiState.loginResult.token).toEqual(expect.any(String));
  expect(apiState.loginBody.data.tokenType).toEqual(expect.any(String));
  const result = await validateAgainstSchema('admin_login_success.json', apiState.loginBody);
  expect(result.errors, JSON.stringify(result.errors)).toEqual([]);
  expect(result.valid).toBe(true);
});

Then('the admin login client receives the captured 401 response', async ({ apiState }) => {
  expect(apiState.mockLoginResult.raw.status()).toBe(401);
  const result = await validateAgainstSchema('admin_login_error.json', apiState.mockLoginBody);
  expect(result.errors, JSON.stringify(result.errors)).toEqual([]);
  expect(result.valid).toBe(true);
});

Then('no authentication token is returned', async ({ apiState }) => {
  expect(apiState.mockLoginResult.token).toBeNull();
});

Then('the mocked request contains no bearer authorization header', async ({ apiState }) => {
  expect(apiState.mockLoginRequest.url).toContain('/api/v1/auth/login');
  expect(apiState.mockLoginRequest.options.headers?.Authorization).toBeUndefined();
});