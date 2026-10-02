# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: features/admin/AdminAuth.feature.spec.js >> Administrator authentication API >> Configured administrator credentials return a bearer token
- Location: .features-gen/features/admin/AdminAuth.feature.spec.js:6:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | import { AdminAuthApiClient } from '../clients/AdminAuthApiClient.js';
  3  | import { validateAgainstSchema } from '../utils/schemaValidator.js';
  4  | import { Given, When, Then } from '../support/hooks.js';
  5  | 
  6  | Given('I log into the admin API with configured credentials', async ({ apiContext, apiState }) => {
  7  |   const username = process.env.ADMIN_USER;
  8  |   const password = process.env.ADMIN_PASS;
  9  |   test.skip(!username || !password, 'Set ADMIN_USER and ADMIN_PASS to run admin API scenarios.');
  10 | 
  11 |   const client = new AdminAuthApiClient({ request: apiContext });
  12 |   apiState.adminAuthClient = client;
  13 |   apiState.loginResult = await client.login(username, password);
  14 |   apiState.loginBody = apiState.loginResult.raw.ok() ? await apiState.loginResult.raw.json() : null;
  15 |   apiState.authHeaders = client.getAuthHeaders(apiState.loginResult.token);
  16 | });
  17 | 
  18 | Given('the admin login API is replaced by a deterministic mock', async ({ apiState }) => {
  19 |   apiState.mockLoginBody = { success: false, message: 'Invalid email or password ' };
  20 |   const mockRequest = {
  21 |     fetch: async (url, options) => {
  22 |       apiState.mockLoginRequest = { url, options };
  23 |       return {
  24 |         status: () => 401,
  25 |         ok: () => false,
  26 |         json: async () => apiState.mockLoginBody,
  27 |       };
  28 |     },
  29 |   };
  30 |   apiState.mockAdminAuthClient = new AdminAuthApiClient({ request: mockRequest });
  31 | });
  32 | 
  33 | When('I submit invalid mock admin credentials', async ({ apiState }) => {
  34 |   apiState.mockLoginResult = await apiState.mockAdminAuthClient.login(
  35 |     'qa.mock.admin@example.invalid',
  36 |     'not-a-real-password',
  37 |   );
  38 | });
  39 | 
  40 | Then('the admin login response has status 200 and a documented token', async ({ apiState }) => {
> 41 |   expect(apiState.loginResult.raw.status()).toBe(200);
     |                                             ^ Error: expect(received).toBe(expected) // Object.is equality
  42 |   expect(apiState.loginResult.token).toEqual(expect.any(String));
  43 |   expect(apiState.loginBody.data.tokenType).toEqual(expect.any(String));
  44 |   const result = await validateAgainstSchema('admin_login_success.json', apiState.loginBody);
  45 |   expect(result.errors, JSON.stringify(result.errors)).toEqual([]);
  46 |   expect(result.valid).toBe(true);
  47 | });
  48 | 
  49 | Then('the admin login client receives the captured 401 response', async ({ apiState }) => {
  50 |   expect(apiState.mockLoginResult.raw.status()).toBe(401);
  51 |   const result = await validateAgainstSchema('admin_login_error.json', apiState.mockLoginBody);
  52 |   expect(result.errors, JSON.stringify(result.errors)).toEqual([]);
  53 |   expect(result.valid).toBe(true);
  54 | });
  55 | 
  56 | Then('no authentication token is returned', async ({ apiState }) => {
  57 |   expect(apiState.mockLoginResult.token).toBeNull();
  58 | });
  59 | 
  60 | Then('the mocked request contains no bearer authorization header', async ({ apiState }) => {
  61 |   expect(apiState.mockLoginRequest.url).toContain('/api/v1/auth/login');
  62 |   expect(apiState.mockLoginRequest.options.headers?.Authorization).toBeUndefined();
  63 | });
```