import { expect, test } from '@playwright/test';
import { Given, When, Then } from '../support/hooks.js';

Given('I open the administrator portal login page', async ({ page, apiState }) => {
  apiState.adminPortalRequests = [];
  page.on('request', (request) => {
    apiState.adminPortalRequests.push({ method: request.method(), url: request.url() });
  });
  await page.goto(process.env.ADMIN_PORTAL_URL || 'https://admin.jonoconsultancy.com/');
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
});

When('I sign in with the configured administrator account', async ({ page }) => {
  const username = process.env.ADMIN_USER;
  const password = process.env.ADMIN_PASS;
  test.skip(!username || !password, 'Set ADMIN_USER and ADMIN_PASS to run admin portal UI scenarios.');

  await page.locator('input[name="email"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: 'Sign In to Dashboard' }).click();
  await expect(page).not.toHaveURL(/\/admin\/login$/);
});

Then('I reach an authenticated admin dashboard', async ({ page }) => {
  await expect(page.getByText(/dashboard/i).first()).toBeVisible();
});

Then('dashboard content is visible', async ({ page }) => {
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('body')).not.toContainText(/invalid email or password/i);
});

Then('the scenario performs no lead management mutations', async ({ apiState }) => {
  const mutations = apiState.adminPortalRequests.filter(({ method, url }) =>
    ['PUT', 'PATCH', 'DELETE'].includes(method)
    || (method === 'POST' && !url.includes('/api/v1/auth/login')),
  );
  expect(mutations).toEqual([]);
});