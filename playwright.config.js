import 'dotenv/config';
import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: ['steps/**/*.js', 'support/hooks.js'],
  outputDir: '.features-gen',
});

export default defineConfig({
  testDir,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: { screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  reporter: [[
    'html',
    { outputFolder: process.env.PLAYWRIGHT_HTML_OUTPUT_DIR || 'reports/html', open: 'never' },
  ], ['list'], [
    'allure-playwright',
    {
      resultsDir: process.env.ALLURE_RESULTS_DIR || 'reports/allure-results',
      detail: true,
    },
  ]],
  projects: [
    { name: 'api', grepInvert: /@UI/, use: { baseURL: undefined } },
    { name: 'ui', grep: /@UI/, use: { browserName: 'chromium', baseURL: process.env.PUBLIC_SITE_URL || 'https://jonoconsultancy.com' } },
  ],
});