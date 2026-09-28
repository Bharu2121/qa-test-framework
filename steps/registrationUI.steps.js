import { expect } from '@playwright/test';
import { Given, When, Then } from '../support/hooks.js';

const registrationEndpoint = '/api/v1/students/register';

async function fillPersonalInformation(page) {
  await page.locator('input[name="firstName"]').fill('QA');
  await page.locator('input[name="lastName"]').fill('UI Example');
  await page.locator('input[name="email"]').fill(`qa.ui.${Date.now()}@example.invalid`);
  await page.locator('input[name="mobile"]').fill('9876543210');
  await page.locator('input[name="dateOfBirth"]').fill('1998-04-12');
  await page.locator('input[name="city"]').fill('Test City');
  await page.locator('select[name="state"]').selectOption({ label: 'Telangana' });
}

async function advanceToAcademicDetails(page) {
  await fillPersonalInformation(page);
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('select[name="qualification"]')).toBeVisible();
}

async function advanceToDestinationPreferences(page) {
  await advanceToAcademicDetails(page);
  await page.locator('select[name="qualification"]').selectOption({ label: 'Bachelor of Science (B.Sc)' });
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('select[name="preferredCountry"]')).toBeVisible();
}

Given('I open the public registration form', async ({ page, apiState }) => {
  apiState.registrationRequests = [];
  page.on('request', (request) => {
    if (request.url().includes(registrationEndpoint)) apiState.registrationRequests.push(request);
  });
  await page.goto('/');
});

When('the registration page finishes loading', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Student Registration Application' })).toBeVisible();
});

Then('I see the personal-information inputs and Continue action', async ({ page }) => {
  for (const field of ['firstName', 'lastName', 'email', 'mobile', 'dateOfBirth', 'city', 'state']) {
    await expect(page.locator(`[name="${field}"]`)).toBeVisible();
  }
  await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
});

Then('later wizard steps are not yet available', async ({ page }) => {
  await expect(page.locator('select[name="qualification"]')).toHaveCount(0);
  await expect(page.locator('select[name="preferredCountry"]')).toHaveCount(0);
});

When('I continue without entering personal information', async ({ page }) => {
  await page.getByRole('button', { name: 'Continue' }).click();
});

Then('the form remains on the personal-information step', async ({ page }) => {
  await expect(page.locator('input[name="firstName"]')).toBeVisible();
});

Then('the academic qualification step is still hidden', async ({ page }) => {
  await expect(page.locator('select[name="qualification"]')).toHaveCount(0);
});

Given('I enter valid synthetic personal information', async ({ page }) => {
  await fillPersonalInformation(page);
});

When('I continue to academic details', async ({ page }) => {
  await page.getByRole('button', { name: 'Continue' }).click();
});

Then('the qualification selector is visible', async ({ page }) => {
  await expect(page.locator('select[name="qualification"]')).toBeVisible();
});

Then('the applicant summary shows the synthetic name', async ({ page }) => {
  await expect(page.getByText('QA UI Example', { exact: false })).toBeVisible();
});

When('I return to personal information', async ({ page }) => {
  await page.getByRole('button', { name: 'Back' }).click();
});

Then('the previously entered email and mobile are retained', async ({ page }) => {
  await expect(page.locator('input[name="email"]')).toHaveValue(/^qa\.ui\..+@example\.invalid$/);
  await expect(page.locator('input[name="mobile"]')).toHaveValue('9876543210');
});

Then('the user can continue editing the application', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
});

Given('I complete personal information and academic details', async ({ page }) => {
  await advanceToAcademicDetails(page);
  await page.locator('select[name="qualification"]').selectOption({ label: 'Bachelor of Science (B.Sc)' });
});

When('I continue to destination preferences', async ({ page }) => {
  await page.getByRole('button', { name: 'Continue' }).click();
});

When('I choose a qualification and continue to destination preferences', async ({ page }) => {
  await page.locator('select[name="qualification"]').selectOption({ label: 'Bachelor of Science (B.Sc)' });
  await page.getByRole('button', { name: 'Continue' }).click();
});

Then('the preferred-country selector is visible', async ({ page }) => {
  await expect(page.locator('select[name="preferredCountry"]')).toBeVisible();
});

Then('the final submit action is available', async ({ page }) => {
  await expect(page.getByRole('button', { name: /Submit & Connect with Expert/ })).toBeVisible();
});

Then('the final submit action is not clicked', async ({ page, apiState }) => {
  await expect(page.getByRole('button', { name: /Submit & Connect with Expert/ })).toBeVisible();
  expect(apiState.registrationRequests).toHaveLength(0);
});

When('I try to submit without choosing a destination', async ({ page }) => {
  await page.getByRole('button', { name: /Submit & Connect with Expert/ }).click();
});

Then('the form stays on destination preferences', async ({ page }) => {
  await expect(page.locator('select[name="preferredCountry"]')).toBeVisible();
  await expect(page).not.toHaveURL(/\/success$/);
});

Then('a destination validation message is shown', async ({ page }) => {
  await expect(page.getByText('Please select your preferred study destination')).toBeVisible();
});

When('I select Canada as the preferred destination', async ({ page }) => {
  await page.locator('select[name="preferredCountry"]').selectOption({ label: 'Canada' });
});

Then('the destination validation message is not shown', async ({ page }) => {
  await expect(page.getByText('Please select your preferred study destination')).toHaveCount(0);
});

Then('the submit action is available for the user', async ({ page }) => {
  await expect(page.getByRole('button', { name: /Submit & Connect with Expert/ })).toBeVisible();
});

Then('the applicant summary remains visible', async ({ page }) => {
  await expect(page.getByText('QA UI Example', { exact: false })).toBeVisible();
});

Then('the application is not submitted by this scenario', async ({ page, apiState }) => {
  expect(page.url()).not.toMatch(/\/success$/);
  expect(apiState.registrationRequests).toHaveLength(0);
});

Then('no registration is submitted', async ({ page, apiState }) => {
  expect(page.url()).not.toMatch(/\/success$/);
  expect(apiState.registrationRequests).toHaveLength(0);
});

Then('no registration request is sent', async ({ page, apiState }) => {
  expect(page.url()).not.toMatch(/\/success$/);
  expect(apiState.registrationRequests).toHaveLength(0);
});