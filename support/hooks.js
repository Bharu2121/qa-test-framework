import { request } from '@playwright/test';
import { createBdd, test as base } from 'playwright-bdd';

export const test = base.extend({
  apiContext: async ({}, use) => {
    const context = await request.newContext({ timeout: 20_000 });
    await use(context);
    await context.dispose();
  },
  apiState: async ({}, use) => {
    await use({});
  },
});

export const { Given, When, Then } = createBdd(test);