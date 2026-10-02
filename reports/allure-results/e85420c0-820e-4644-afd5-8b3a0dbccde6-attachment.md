# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: features/admin/AdminPortalUI.feature.spec.js >> Administrator portal >> An authorized administrator can sign in and view the dashboard
- Location: .features-gen/features/admin/AdminPortalUI.feature.spec.js:6:3

# Error details

```
Error: expect(page).not.toHaveURL(expected) failed

Expected pattern: not /\/admin\/login$/
Received string: "https://admin.jonoconsultancy.com/admin/login"
Timeout: 5000ms

Call log:
  - Expect "not toHaveURL" with timeout 5000ms
    9 × unexpected value "https://admin.jonoconsultancy.com/admin/login"

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]:
    - img "Jono Consultancy Logo" [ref=e7]
    - heading "Jono Consultancy" [level=1] [ref=e8]
    - paragraph [ref=e9]: Official Administrator Management Console
  - generic [ref=e10]:
    - generic [ref=e12]:
      - img [ref=e13]
      - heading "Secure Administrator Login" [level=2] [ref=e16]
    - generic [ref=e17]:
      - img [ref=e18]
      - generic [ref=e20]: Invalid email or password
    - generic [ref=e21]:
      - generic [ref=e22]:
        - generic [ref=e23]: Admin Email
        - generic [ref=e24]:
          - img [ref=e25]
          - textbox "admin@jonoconsultancy.com" [ref=e28]
      - generic [ref=e29]:
        - generic [ref=e30]:
          - generic [ref=e31]: Password
          - button "Forgot Password?" [ref=e32] [cursor=pointer]
        - generic [ref=e33]:
          - img [ref=e34]
          - textbox "••••••••••••" [ref=e37]: AdminPassword123!
          - button [ref=e38] [cursor=pointer]:
            - img [ref=e39]
      - button "Sign In to Dashboard" [ref=e43] [cursor=pointer]:
        - generic [ref=e44]: Sign In to Dashboard
  - paragraph [ref=e45]: Protected management console · Authorized personnel only
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test';
  2  | import { Given, When, Then } from '../support/hooks.js';
  3  | 
  4  | Given('I open the administrator portal login page', async ({ page, apiState }) => {
  5  |   apiState.adminPortalRequests = [];
  6  |   page.on('request', (request) => {
  7  |     apiState.adminPortalRequests.push({ method: request.method(), url: request.url() });
  8  |   });
  9  |   await page.goto(process.env.ADMIN_PORTAL_URL || 'https://admin.jonoconsultancy.com/');
  10 |   await expect(page.locator('input[name="email"]')).toBeVisible();
  11 |   await expect(page.locator('input[name="password"]')).toBeVisible();
  12 | });
  13 | 
  14 | When('I sign in with the configured administrator account', async ({ page }) => {
  15 |   const username = process.env.ADMIN_USER;
  16 |   const password = process.env.ADMIN_PASS;
  17 |   test.skip(!username || !password, 'Set ADMIN_USER and ADMIN_PASS to run admin portal UI scenarios.');
  18 | 
  19 |   await page.locator('input[name="email"]').fill(username);
  20 |   await page.locator('input[name="password"]').fill(password);
  21 |   await page.getByRole('button', { name: 'Sign In to Dashboard' }).click();
> 22 |   await expect(page).not.toHaveURL(/\/admin\/login$/);
     |                          ^ Error: expect(page).not.toHaveURL(expected) failed
  23 | });
  24 | 
  25 | Then('I reach an authenticated admin dashboard', async ({ page }) => {
  26 |   await expect(page.getByText(/dashboard/i).first()).toBeVisible();
  27 | });
  28 | 
  29 | Then('dashboard content is visible', async ({ page }) => {
  30 |   await expect(page.locator('main')).toBeVisible();
  31 |   await expect(page.locator('body')).not.toContainText(/invalid email or password/i);
  32 | });
  33 | 
  34 | Then('the scenario performs no lead management mutations', async ({ apiState }) => {
  35 |   const mutations = apiState.adminPortalRequests.filter(({ method, url }) =>
  36 |     ['PUT', 'PATCH', 'DELETE'].includes(method)
  37 |     || (method === 'POST' && !url.includes('/api/v1/auth/login')),
  38 |   );
  39 |   expect(mutations).toEqual([]);
  40 | });
```