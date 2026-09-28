# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: features/admin/AdminSecurity.feature.spec.js >> Administrator security and authentication controls >> Protected API error responses do not contain conflicting XSS policy headers
- Location: .features-gen/features/admin/AdminSecurity.feature.spec.js:105:3

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    2
```

# Test source

```ts
  177 |     data: { email: username, password },
  178 |     maxRedirects: 0,
  179 |   });
  180 |   expect(response.status()).toBe(200);
  181 |   const body = await response.json();
  182 |   expect(typeof body?.data?.token === 'string' && body.data.token.length > 0).toBe(true);
  183 |   apiState.securityProbeToken = body.data.token;
  184 | });
  185 | 
  186 | When('I send an unauthenticated GET request to protected endpoint {string}', async ({ apiContext, apiState }, endpoint) => {
  187 |   const url = new URL(endpoint, `${apiState.securityProbeBaseUrl}/`).toString();
  188 |   apiState.securityProbeResponse = await apiContext.get(url, { maxRedirects: 0 });
  189 | });
  190 | 
  191 | When('I send a GET request to protected endpoint {string} with bearer token {string}', async ({ apiContext, apiState }, endpoint, token) => {
  192 |   const url = new URL(endpoint, `${apiState.securityProbeBaseUrl}/`).toString();
  193 |   apiState.securityProbeResponse = await apiContext.get(url, {
  194 |     headers: { Authorization: `Bearer ${token}` },
  195 |     maxRedirects: 0,
  196 |   });
  197 | });
  198 | 
  199 | When('I request my profile with the read-only security probe', async ({ apiContext, apiState }) => {
  200 |   const url = new URL('/api/v1/auth/profile', `${apiState.securityProbeBaseUrl}/`).toString();
  201 |   apiState.ownProfileResponse = await apiContext.get(url, {
  202 |     headers: { Authorization: `Bearer ${apiState.securityProbeToken}` },
  203 |     maxRedirects: 0,
  204 |   });
  205 | });
  206 | 
  207 | When('I request dashboard statistics with the read-only security probe', async ({ apiContext, apiState }) => {
  208 |   const url = new URL('/api/v1/admin/dashboard/stats', `${apiState.securityProbeBaseUrl}/`).toString();
  209 |   apiState.securityProbeDashboardResponse = await apiContext.get(url, {
  210 |     headers: { Authorization: `Bearer ${apiState.securityProbeToken}` },
  211 |     maxRedirects: 0,
  212 |   });
  213 | });
  214 | 
  215 | When('I submit one invalid login with synthetic non-existent credentials', async ({ apiContext, apiState }) => {
  216 |   const url = new URL('/api/v1/auth/login', `${apiState.securityProbeBaseUrl}/`).toString();
  217 |   apiState.invalidLoginEmail = `qa.security.${Date.now()}@example.invalid`;
  218 |   apiState.invalidLoginPassword = 'NotARealPassword!2026';
  219 |   apiState.invalidLoginResponse = await apiContext.post(url, {
  220 |     data: { email: apiState.invalidLoginEmail, password: apiState.invalidLoginPassword },
  221 |     maxRedirects: 0,
  222 |   });
  223 | });
  224 | 
  225 | When('I inspect protected profile response headers using HEAD', async ({ apiContext, apiState }) => {
  226 |   const url = new URL('/api/v1/auth/profile', `${apiState.securityProbeBaseUrl}/`).toString();
  227 |   apiState.securityHeadersResponse = await apiContext.head(url, { maxRedirects: 0 });
  228 | });
  229 | 
  230 | When('I request admin lead detail for identifier {string}', async ({ apiContext, apiState }, id) => {
  231 |   const client = new AdminLeadsApiClient({ request: apiContext, baseUrl: apiState.securityProbeBaseUrl });
  232 |   apiState.securityProbeResponse = await client.getLeadDetail(id, {
  233 |     headers: { Authorization: `Bearer ${apiState.securityProbeToken}` },
  234 |   });
  235 | });
  236 | 
  237 | Then('the protected request is rejected without exposing data', async ({ apiState }) => {
  238 |   expect([401, 403]).toContain(apiState.securityProbeResponse.status());
  239 | });
  240 | 
  241 | Then('the profile belongs to the configured administrator and exposes no credentials', async ({ apiState }) => {
  242 |   expect(apiState.ownProfileResponse.status()).toBe(200);
  243 |   const body = await apiState.ownProfileResponse.json();
  244 |   const result = await validateAgainstSchema('admin_profile.json', body);
  245 |   expect(result.valid).toBe(true);
  246 |   expect(body.data.email === process.env.ADMIN_USER).toBe(true);
  247 |   const exposedCredentials = ['password', 'passwordHash', 'token', 'refreshToken']
  248 |     .some((field) => Object.hasOwn(body.data, field));
  249 |   expect(exposedCredentials).toBe(false);
  250 | });
  251 | 
  252 | Then('the dashboard response contains non-negative aggregate counters', async ({ apiState }) => {
  253 |   expect(apiState.securityProbeDashboardResponse.status()).toBe(200);
  254 |   const body = await apiState.securityProbeDashboardResponse.json();
  255 |   const result = await validateAgainstSchema('dashboard_stats.json', body);
  256 |   expect(result.valid).toBe(true);
  257 |   const counters = Object.values(body.data);
  258 |   expect(counters.length > 0 && counters.every((counter) => Number.isFinite(counter) && counter >= 0)).toBe(true);
  259 | });
  260 | 
  261 | Then('the login attempt is rejected without echoing credentials or internal errors', async ({ apiState }) => {
  262 |   expect(apiState.invalidLoginResponse.status()).toBe(401);
  263 |   const body = await apiState.invalidLoginResponse.text();
  264 |   const echoesCredentials = body.includes(apiState.invalidLoginEmail)
  265 |     || body.includes(apiState.invalidLoginPassword);
  266 |   const exposesInternals = /exception|stack trace|sqlstate|jdbc|hibernate|select\s+.+\s+from/i.test(body);
  267 |   expect(echoesCredentials).toBe(false);
  268 |   expect(exposesInternals).toBe(false);
  269 | });
  270 | 
  271 | Then('duplicate XSS protection headers do not conflict', async ({ apiState }) => {
  272 |   expect([401, 403]).toContain(apiState.securityHeadersResponse.status());
  273 |   const headers = await apiState.securityHeadersResponse.headersArray();
  274 |   const xssProtectionValues = headers
  275 |     .filter(({ name }) => name.toLowerCase() === 'x-xss-protection')
  276 |     .map(({ value }) => value.trim().toLowerCase());
> 277 |   expect(new Set(xssProtectionValues).size).toBeLessThanOrEqual(1);
      |                                             ^ Error: expect(received).toBeLessThanOrEqual(expected)
  278 | });
  279 | 
  280 | Then('the invalid identifier is rejected without internal error details', async ({ apiState }) => {
  281 |   expect([400, 404]).toContain(apiState.securityProbeResponse.status());
  282 |   const body = await apiState.securityProbeResponse.text();
  283 |   expect(body).not.toMatch(/exception|stack trace|sqlstate|jdbc|hibernate|select\s+.+\s+from/i);
  284 | });
  285 | 
  286 | When('I log in with a valid admin credential pair', async ({ apiState }) => {
  287 |   const mockClient = apiState.mockSecurityClient;
  288 |   const response = await mockClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/login', {
  289 |     method: 'POST',
  290 |     data: { email: 'admin@example.com', password: 'StrongPass!123' },
  291 |     headers: { 'Content-Type': 'application/json' },
  292 |   });
  293 |   apiState.securityLoginResponse = response;
  294 |   apiState.securityLoginBody = await response.json();
  295 |   apiState.securityToken = response.token;
  296 | });
  297 | 
  298 | Then('the security login response has status 200 with a bearer token', async ({ apiState }) => {
  299 |   expect(apiState.securityLoginResponse.status()).toBe(200);
  300 |   expect(apiState.securityToken).toEqual(expect.any(String));
  301 |   expect(apiState.securityLoginBody.data.token).toContain('.');
  302 |   expect(apiState.securityLoginBody.data.tokenType).toBe('Bearer');
  303 | });
  304 | 
  305 | Then('the failure response for invalid credentials is 401 without exposing the password', async ({ apiState }) => {
  306 |   const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/login', {
  307 |     method: 'POST',
  308 |     data: { email: 'admin@example.com', password: 'WrongPass!123' },
  309 |     headers: { 'Content-Type': 'application/json' },
  310 |   });
  311 |   const body = await response.json();
  312 |   expect(response.status()).toBe(401);
  313 |   expect(body.message).toBe('Invalid email or password');
  314 |   expect(JSON.stringify(body)).not.toContain('WrongPass!123');
  315 | });
  316 | 
  317 | When('I request the protected profile without a bearer token', async ({ apiState }) => {
  318 |   const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/profile', {
  319 |     method: 'GET',
  320 |     headers: { 'Content-Type': 'application/json' },
  321 |   });
  322 |   apiState.profileWithoutTokenResponse = response;
  323 | });
  324 | 
  325 | Then('the profile request without a token is rejected with 401', async ({ apiState }) => {
  326 |   expect(apiState.profileWithoutTokenResponse.status()).toBe(401);
  327 | });
  328 | 
  329 | Then('a malformed JWT is rejected', async ({ apiState }) => {
  330 |   const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/profile', {
  331 |     method: 'GET',
  332 |     headers: { Authorization: 'Bearer not-a-valid-jwt', 'Content-Type': 'application/json' },
  333 |   });
  334 |   expect(response.status()).toBe(401);
  335 | });
  336 | 
  337 | Then('an expired JWT is rejected', async ({ apiState }) => {
  338 |   const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/profile', {
  339 |     method: 'GET',
  340 |     headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWJqZWN0Iiwicm9sZSI6IkFETUlOIiwidXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6MTQ3NDU2MzQwMH0.signature', 'Content-Type': 'application/json' },
  341 |   });
  342 |   expect(response.status()).toBe(401);
  343 | });
  344 | 
  345 | Then('a tampered JWT is rejected', async ({ apiState }) => {
  346 |   const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/profile', {
  347 |     method: 'GET',
  348 |     headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdWJqZWN0Iiwicm9sZSI6IkFETUlOIiwidXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6NDY0OTQ2NDAwMH0.modified', 'Content-Type': 'application/json' },
  349 |   });
  350 |   expect([401, 403]).toContain(response.status());
  351 | });
  352 | 
  353 | When('I request a password recovery token for a registered admin email', async ({ apiState }) => {
  354 |   const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/forgot-password', {
  355 |     method: 'POST',
  356 |     data: { email: 'admin@example.com' },
  357 |     headers: { 'Content-Type': 'application/json' },
  358 |   });
  359 |   apiState.recoveryResponse = response;
  360 |   apiState.recoveryBody = await response.json();
  361 | });
  362 | 
  363 | Then('the recovery request succeeds and a token is issued', async ({ apiState }) => {
  364 |   expect(apiState.recoveryResponse.status()).toBe(200);
  365 |   expect(apiState.recoveryBody.data.recoveryToken).toEqual(expect.any(String));
  366 |   apiState.validRecoveryToken = apiState.recoveryBody.data.recoveryToken;
  367 | });
  368 | 
  369 | Then('an invalid recovery key is rejected', async ({ apiState }) => {
  370 |   const response = await apiState.mockSecurityClient.request.fetch('https://api.jonoconsultancy.com/api/v1/auth/reset-password', {
  371 |     method: 'POST',
  372 |     data: { recoveryToken: 'bad-key', password: 'NewPass!123', confirmPassword: 'NewPass!123' },
  373 |     headers: { 'Content-Type': 'application/json' },
  374 |   });
  375 |   expect(response.status()).toBe(400);
  376 | });
  377 | 
```