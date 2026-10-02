import { expect, test } from '@playwright/test';
import { AdminLeadsApiClient } from '../clients/AdminLeadsApiClient.js';
import { validateAgainstSchema } from '../utils/schemaValidator.js';
import { Given, When, Then } from '../support/hooks.js';

const sensitiveFieldPattern = /password|token|secret|authorization|cookie|api[-_]?key|email|username/i;

const redactDiagnosticText = (value, sensitiveValues) => {
  let sanitized = value;
  for (const sensitiveValue of sensitiveValues) {
    sanitized = sanitized.replaceAll(sensitiveValue, '[REDACTED]');
  }
  return sanitized
    .replace(/\bBearer\s+\S+/gi, 'Bearer [REDACTED]')
    .replace(/\beyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\b/g, '[REDACTED]');
};

const redactDiagnosticValue = (value, sensitiveValues) => {
  if (Array.isArray(value)) {
    return value.map((item) => redactDiagnosticValue(item, sensitiveValues));
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [
      key,
      sensitiveFieldPattern.test(key) ? '[REDACTED]' : redactDiagnosticValue(item, sensitiveValues),
    ]));
  }
  return typeof value === 'string' ? redactDiagnosticText(value, sensitiveValues) : value;
};

const getResponseDiagnostic = async (response, apiState) => {
  const sensitiveValues = [
    process.env.ADMIN_USER,
    process.env.ADMIN_PASS,
    apiState.securityProbeToken,
    apiState.invalidLoginEmail,
    apiState.invalidLoginPassword,
  ].filter(Boolean);
  const headers = (await response.headersArray()).map(({ name, value }) => ({
    name,
    value: sensitiveFieldPattern.test(name) ? '[REDACTED]' : redactDiagnosticText(value, sensitiveValues),
  }));
  const responseBody = await response.text();
  let body;
  try {
    body = JSON.stringify(redactDiagnosticValue(JSON.parse(responseBody), sensitiveValues), null, 2);
  } catch {
    body = redactDiagnosticText(responseBody, sensitiveValues);
  }

  return [
    `Response: ${response.status()} ${response.url()}`,
    `Headers: ${JSON.stringify(headers, null, 2)}`,
    `Body: ${body}`,
  ].join('\n');
};

const assertWithResponse = async (response, apiState, testInfo, assertions) => {
  const diagnostic = await getResponseDiagnostic(response, apiState);
  try {
    await assertions(diagnostic);
  } catch (error) {
    await testInfo.attach('response-details.txt', {
      body: diagnostic,
      contentType: 'text/plain',
    });
    throw error;
  }
};

const buildMockResponse = ({ status, body, token = null, headers = {} }) => ({
  status: () => status,
  ok: () => status >= 200 && status < 300,
  json: async () => body,
  headers: () => headers,
  text: async () => JSON.stringify(body),
  token,
});

const mockSecurityRequestFactory = (apiState) => {
  const state = {
    validToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWJqZWN0Iiwicm9sZSI6IkFETUlOIiwidXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6NDY0OTQ2NDAwMH0.signature',
    expiredToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWJqZWN0Iiwicm9sZSI6IkFETUlOIiwidXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6MTQ3NDU2MzQwMH0.signature',
    invalidToken: 'not-a-valid-jwt',
    logoutCalled: false,
    recoveryToken: 'recovery-token-123',
    securePassword: 'P@ssw0rd!2026',
    lastAuth: null,
    activeSessionToken: null,
  };

  const mockRequest = {
    fetch: async (url, options = {}) => {
      const method = options.method || 'GET';
      const body = options.data ? JSON.parse(JSON.stringify(options.data)) : null;
      const authHeader = options.headers?.Authorization || options.headers?.authorization || '';
      const token = authHeader.replace(/^Bearer\s+/i, '');
      const requestUrl = String(url);
      apiState.mockSecurityRequest = { url: requestUrl, method, headers: options.headers || {}, body };

      if (requestUrl.includes('/api/v1/auth/login')) {
        const { email, password } = body || {};
        const isValid = email === 'admin@example.com' && password === 'StrongPass!123';
        if (isValid) {
          state.lastAuth = { email, token: state.validToken };
          state.activeSessionToken = state.validToken;
          state.logoutCalled = false;
          return buildMockResponse({
            status: 200,
            body: {
              success: true,
              message: 'Login successful',
              data: {
                token: state.validToken,
                tokenType: 'Bearer',
                expiresAt: '2030-01-01T00:00:00.000Z',
                username: 'admin',
                email,
              },
            },
            token: state.validToken,
          });
        }

        return buildMockResponse({
          status: 401,
          body: { success: false, message: 'Invalid email or password' },
        });
      }

      if (requestUrl.includes('/api/v1/auth/logout')) {
        state.logoutCalled = true;
        state.activeSessionToken = null;
        return buildMockResponse({
          status: 200,
          body: { success: true, message: 'Logged out successfully' },
        });
      }

      if (requestUrl.includes('/api/v1/auth/forgot-password')) {
        return buildMockResponse({
          status: 200,
          body: { success: true, message: 'Recovery email sent', data: { recoveryToken: state.recoveryToken } },
        });
      }

      if (requestUrl.includes('/api/v1/auth/reset-password')) {
        const { recoveryToken, password, confirmPassword } = body || {};
        if (!recoveryToken || recoveryToken !== state.recoveryToken) {
          return buildMockResponse({ status: 400, body: { success: false, message: 'Invalid recovery key' } });
        }
        if (password !== confirmPassword) {
          return buildMockResponse({ status: 400, body: { success: false, message: 'Passwords do not match' } });
        }
        if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password)) {
          return buildMockResponse({ status: 400, body: { success: false, message: 'Password does not meet the required policy' } });
        }
        return buildMockResponse({
          status: 200,
          body: {
            success: true,
            message: 'Password reset successful',
            data: { passwordUpdated: true, resetToken: state.recoveryToken },
          },
        });
      }

      if (requestUrl.includes('/api/v1/auth/profile')) {
        if (!token || token === state.invalidToken || token === state.expiredToken) {
          return buildMockResponse({ status: 401, body: { success: false, message: 'Unauthorized' } });
        }
        if (state.logoutCalled || state.activeSessionToken !== token) {
          return buildMockResponse({ status: 401, body: { success: false, message: 'Session invalidated' } });
        }
        if (token !== state.validToken) {
          return buildMockResponse({ status: 403, body: { success: false, message: 'Forbidden' } });
        }
        return buildMockResponse({
          status: 200,
          body: {
            success: true,
            data: {
              id: 1,
              email: 'admin@example.com',
              username: 'admin',
              profilePictureUrl: null,
            },
          },
        });
      }

      if (requestUrl.includes('/api/v1/auth/login') && method === 'POST' && body?.email === 'admin@example.com' && body?.password === 'WrongPass!123') {
        return buildMockResponse({ status: 401, body: { success: false, message: 'Invalid email or password' } });
      }

      return buildMockResponse({ status: 404, body: { success: false, message: 'Not found' } });
    },
  };

  apiState.mockSecurityClient = { request: mockRequest, apiState, __mockState: state };
  return apiState.mockSecurityClient;
};

Given('I use a mock admin security API', async ({ apiState }) => {
  mockSecurityRequestFactory(apiState);
});

Given('read-only security probes are explicitly enabled', async ({ apiState }) => {
  test.skip(
    process.env.ALLOW_READONLY_SECURITY_PROBES !== 'true',
    'Set ALLOW_READONLY_SECURITY_PROBES=true to run read-only security probes.',
  );
  const baseUrl = process.env.SECURITY_TEST_BASE_URL;
  test.skip(!baseUrl, 'Set SECURITY_TEST_BASE_URL to an authorized non-production API.');

  const parsedUrl = new URL(baseUrl);
  test.skip(parsedUrl.protocol !== 'https:', 'Security probe URL must use HTTPS.');
  const hostname = parsedUrl.hostname.toLowerCase();
  const isProductionHost = [
    'jonoconsultancy.com',
    'www.jonoconsultancy.com',
    'api.jonoconsultancy.com',
    'admin.jonoconsultancy.com',
  ].includes(hostname);
  test.skip(
    isProductionHost && (
      hostname !== 'api.jonoconsultancy.com'
      || process.env.ALLOW_PRODUCTION_SECURITY_PROBES !== 'true'
    ),
    'Production probes require the explicit opt-in and the production API hostname.',
  );
  apiState.securityProbeBaseUrl = parsedUrl.toString().replace(/\/$/, '');
});

Given('I authenticate the read-only security probe as an authorized administrator', async ({ apiContext, apiState, $testInfo }) => {
  const username = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASS;
  test.skip(!username || !password, 'Set authorized ADMIN_USER and ADMIN_PASS for lead detail probes.');

  const loginUrl = new URL('/api/v1/auth/login', `${apiState.securityProbeBaseUrl}/`).toString();
  const response = await apiContext.post(loginUrl, {
    data: { email: username, password },
    maxRedirects: 0,
  });
  let body;
  await assertWithResponse(response, apiState, $testInfo, async (diagnostic) => {
    expect(response.status(), diagnostic).toBe(200);
    body = await response.json();
    expect(typeof body?.data?.token === 'string' && body.data.token.length > 0, diagnostic).toBe(true);
  });
  apiState.securityProbeToken = body.data.token;
});

When('I send an unauthenticated GET request to protected endpoint {string}', async ({ apiContext, apiState }, endpoint) => {
  const url = new URL(endpoint, `${apiState.securityProbeBaseUrl}/`).toString();
  apiState.securityProbeResponse = await apiContext.get(url, { maxRedirects: 0 });
});

When('I send a GET request to protected endpoint {string} with bearer token {string}', async ({ apiContext, apiState }, endpoint, token) => {
  const url = new URL(endpoint, `${apiState.securityProbeBaseUrl}/`).toString();
  apiState.securityProbeResponse = await apiContext.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    maxRedirects: 0,
  });
});

When('I request my profile with the read-only security probe', async ({ apiContext, apiState }) => {
  const url = new URL('/api/v1/auth/profile', `${apiState.securityProbeBaseUrl}/`).toString();
  apiState.ownProfileResponse = await apiContext.get(url, {
    headers: { Authorization: `Bearer ${apiState.securityProbeToken}` },
    maxRedirects: 0,
  });
});

When('I request dashboard statistics with the read-only security probe', async ({ apiContext, apiState }) => {
  const url = new URL('/api/v1/admin/dashboard/stats', `${apiState.securityProbeBaseUrl}/`).toString();
  apiState.securityProbeDashboardResponse = await apiContext.get(url, {
    headers: { Authorization: `Bearer ${apiState.securityProbeToken}` },
    maxRedirects: 0,
  });
});

When('I submit one invalid login with synthetic non-existent credentials', async ({ apiContext, apiState }) => {
  const url = new URL('/api/v1/auth/login', `${apiState.securityProbeBaseUrl}/`).toString();
  apiState.invalidLoginEmail = `qa.security.${Date.now()}@example.invalid`;
  apiState.invalidLoginPassword = 'NotARealPassword!2026';
  apiState.invalidLoginResponse = await apiContext.post(url, {
    data: { email: apiState.invalidLoginEmail, password: apiState.invalidLoginPassword },
    maxRedirects: 0,
  });
});

When('I inspect protected profile response headers using HEAD', async ({ apiContext, apiState }) => {
  const url = new URL('/api/v1/auth/profile', `${apiState.securityProbeBaseUrl}/`).toString();
  apiState.securityHeadersResponse = await apiContext.head(url, { maxRedirects: 0 });
});

When('I request admin lead detail for identifier {string}', async ({ apiContext, apiState }, id) => {
  const client = new AdminLeadsApiClient({ request: apiContext, baseUrl: apiState.securityProbeBaseUrl });
  apiState.securityProbeResponse = await client.getLeadDetail(id, {
    headers: { Authorization: `Bearer ${apiState.securityProbeToken}` },
  });
});

Then('the protected request is rejected without exposing data', async ({ apiState, $testInfo }) => {
  await assertWithResponse(apiState.securityProbeResponse, apiState, $testInfo, (diagnostic) => {
    expect([401, 403], diagnostic).toContain(apiState.securityProbeResponse.status());
  });
});

Then('the profile belongs to the configured administrator and exposes no credentials', async ({ apiState, $testInfo }) => {
  await assertWithResponse(apiState.ownProfileResponse, apiState, $testInfo, async (diagnostic) => {
    expect(apiState.ownProfileResponse.status(), diagnostic).toBe(200);
    const body = await apiState.ownProfileResponse.json();
    const result = await validateAgainstSchema('admin_profile.json', body);
    expect(result.valid, `${diagnostic}\nSchema errors: ${JSON.stringify(result.errors)}`).toBe(true);
    expect(body.data.email === process.env.ADMIN_USER, diagnostic).toBe(true);
    const exposedCredentials = ['password', 'passwordHash', 'token', 'refreshToken']
      .some((field) => Object.hasOwn(body.data, field));
    expect(exposedCredentials, diagnostic).toBe(false);
  });
});

Then('the dashboard response contains non-negative aggregate counters', async ({ apiState, $testInfo }) => {
  await assertWithResponse(apiState.securityProbeDashboardResponse, apiState, $testInfo, async (diagnostic) => {
    expect(apiState.securityProbeDashboardResponse.status(), diagnostic).toBe(200);
    const body = await apiState.securityProbeDashboardResponse.json();
    const result = await validateAgainstSchema('dashboard_stats.json', body);
    expect(result.valid, `${diagnostic}\nSchema errors: ${JSON.stringify(result.errors)}`).toBe(true);
    const counters = Object.values(body.data);
    expect(counters.length > 0 && counters.every((counter) => Number.isFinite(counter) && counter >= 0), diagnostic).toBe(true);
  });
});

Then('the login attempt is rejected without echoing credentials or internal errors', async ({ apiState, $testInfo }) => {
  await assertWithResponse(apiState.invalidLoginResponse, apiState, $testInfo, async (diagnostic) => {
    expect(apiState.invalidLoginResponse.status(), diagnostic).toBe(401);
    const body = await apiState.invalidLoginResponse.text();
    const echoesCredentials = body.includes(apiState.invalidLoginEmail)
      || body.includes(apiState.invalidLoginPassword);
    const exposesInternals = /exception|stack trace|sqlstate|jdbc|hibernate|select\s+.+\s+from/i.test(body);
    expect(echoesCredentials, diagnostic).toBe(false);
    expect(exposesInternals, diagnostic).toBe(false);
  });
});

Then('duplicate XSS protection headers do not conflict', async ({ apiState, $testInfo }) => {
  await assertWithResponse(apiState.securityHeadersResponse, apiState, $testInfo, async (diagnostic) => {
    expect([401, 403], diagnostic).toContain(apiState.securityHeadersResponse.status());
    const headers = await apiState.securityHeadersResponse.headersArray();
    const xssProtectionValues = headers
      .filter(({ name }) => name.toLowerCase() === 'x-xss-protection')
      .map(({ value }) => value.trim().toLowerCase());
    expect(new Set(xssProtectionValues).size, diagnostic).toBeLessThanOrEqual(1);
  });
});

Then('the invalid identifier is rejected without internal error details', async ({ apiState }) => {
  expect([400, 404]).toContain(apiState.securityProbeResponse.status());
  const body = await apiState.securityProbeResponse.text();
  expect(body).not.toMatch(/exception|stack trace|sqlstate|jdbc|hibernate|select\s+.+\s+from/i);
});

When('I log in with a valid admin credential pair', async ({ apiState }) => {
  const mockClient = apiState.mockSecurityClient;
  const response = await mockClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/login', {
    method: 'POST',
    data: { email: 'admin@example.com', password: 'StrongPass!123' },
    headers: { 'Content-Type': 'application/json' },
  });
  apiState.securityLoginResponse = response;
  apiState.securityLoginBody = await response.json();
  apiState.securityToken = response.token;
});

Then('the security login response has status 200 with a bearer token', async ({ apiState }) => {
  expect(apiState.securityLoginResponse.status()).toBe(200);
  expect(apiState.securityToken).toEqual(expect.any(String));
  expect(apiState.securityLoginBody.data.token).toContain('.');
  expect(apiState.securityLoginBody.data.tokenType).toBe('Bearer');
});

Then('the failure response for invalid credentials is 401 without exposing the password', async ({ apiState }) => {
  const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/login', {
    method: 'POST',
    data: { email: 'admin@example.com', password: 'WrongPass!123' },
    headers: { 'Content-Type': 'application/json' },
  });
  const body = await response.json();
  expect(response.status()).toBe(401);
  expect(body.message).toBe('Invalid email or password');
  expect(JSON.stringify(body)).not.toContain('WrongPass!123');
});

When('I request the protected profile without a bearer token', async ({ apiState }) => {
  const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/profile', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  apiState.profileWithoutTokenResponse = response;
});

Then('the profile request without a token is rejected with 401', async ({ apiState }) => {
  expect(apiState.profileWithoutTokenResponse.status()).toBe(401);
});

Then('a malformed JWT is rejected', async ({ apiState }) => {
  const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/profile', {
    method: 'GET',
    headers: { Authorization: 'Bearer not-a-valid-jwt', 'Content-Type': 'application/json' },
  });
  expect(response.status()).toBe(401);
});

Then('an expired JWT is rejected', async ({ apiState }) => {
  const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/profile', {
    method: 'GET',
    headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWJqZWN0Iiwicm9sZSI6IkFETUlOIiwidXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6MTQ3NDU2MzQwMH0.signature', 'Content-Type': 'application/json' },
  });
  expect(response.status()).toBe(401);
});

Then('a tampered JWT is rejected', async ({ apiState }) => {
  const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/profile', {
    method: 'GET',
    headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWJqZWN0Iiwicm9sZSI6IkFETUlOIiwidXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6NDY0OTQ2NDAwMH0.modified', 'Content-Type': 'application/json' },
  });
  expect([401, 403]).toContain(response.status());
});

When('I request a password recovery token for a registered admin email', async ({ apiState }) => {
  const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/forgot-password', {
    method: 'POST',
    data: { email: 'admin@example.com' },
    headers: { 'Content-Type': 'application/json' },
  });
  apiState.recoveryResponse = response;
  apiState.recoveryBody = await response.json();
});

Then('the recovery request succeeds and a token is issued', async ({ apiState }) => {
  expect(apiState.recoveryResponse.status()).toBe(200);
  expect(apiState.recoveryBody.data.recoveryToken).toEqual(expect.any(String));
  apiState.validRecoveryToken = apiState.recoveryBody.data.recoveryToken;
});

Then('an invalid recovery key is rejected', async ({ apiState }) => {
  const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/reset-password', {
    method: 'POST',
    data: { recoveryToken: 'bad-key', password: 'NewPass!123', confirmPassword: 'NewPass!123' },
    headers: { 'Content-Type': 'application/json' },
  });
  expect(response.status()).toBe(400);
});

Then('a mismatched password confirmation is rejected', async ({ apiState }) => {
  const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/reset-password', {
    method: 'POST',
    data: { recoveryToken: apiState.validRecoveryToken, password: 'NewPass!123', confirmPassword: 'WrongPass!123' },
    headers: { 'Content-Type': 'application/json' },
  });
  expect(response.status()).toBe(400);
});

Then('a valid reset request succeeds and does not expose the secret value', async ({ apiState }) => {
  const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/reset-password', {
    method: 'POST',
    data: { recoveryToken: apiState.validRecoveryToken, password: 'NewPass!123', confirmPassword: 'NewPass!123' },
    headers: { 'Content-Type': 'application/json' },
  });
  const body = await response.json();
  expect(response.status()).toBe(200);
  expect(JSON.stringify(body)).not.toContain('NewPass!123');
});

When('I call logout for the active session', async ({ apiState }) => {
  const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/logout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiState.securityToken}`, 'Content-Type': 'application/json' },
  });
  apiState.logoutResponse = response;
  apiState.logoutBody = await response.json();
});

Then('the logout response is successful', async ({ apiState }) => {
  expect(apiState.logoutResponse.status()).toBe(200);
  expect(apiState.logoutBody.success).toBe(true);
});

Then('the token is invalidated for subsequent protected requests', async ({ apiState }) => {
  const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/profile', {
    method: 'GET',
    headers: { Authorization: `Bearer ${apiState.securityToken}`, 'Content-Type': 'application/json' },
  });
  expect(response.status()).toBe(401);
});

When('I attempt the wrong password three times for the same account', async ({ apiState }) => {
  const attempts = [];
  for (let i = 0; i < 3; i += 1) {
    const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/login', {
      method: 'POST',
      data: { email: 'admin@example.com', password: `WrongPass${i}!123` },
      headers: { 'Content-Type': 'application/json' },
    });
    attempts.push(response);
  }
  apiState.failedAttempts = attempts;
});

Then('each failed login is rejected with 401', async ({ apiState }) => {
  for (const response of apiState.failedAttempts) {
    expect(response.status()).toBe(401);
  }
});

Then('the application response does not reveal whether the username exists', async ({ apiState }) => {
  const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/login', {
    method: 'POST',
    data: { email: 'unknown@example.com', password: 'WrongPass!123' },
    headers: { 'Content-Type': 'application/json' },
  });
  const body = await response.json();
  expect(response.status()).toBe(401);
  expect(body.message).toBe('Invalid email or password');
  expect(JSON.stringify(body)).not.toContain('unknown@example.com');
  expect(JSON.stringify(body)).not.toContain('WrongPass!123');

  const failedBodies = await Promise.all(apiState.failedAttempts.map((failedResponse) => failedResponse.json()));
  for (let index = 0; index < failedBodies.length; index += 1) {
    expect(failedBodies[index]).toEqual(body);
    expect(apiState.failedAttempts[index].status()).toBe(response.status());
  }
});
