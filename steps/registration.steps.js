import { expect, test } from '@playwright/test';
import { RegistrationApiClient } from '../clients/RegistrationApiClient.js';
import { generateUniqueRegistrationPayload, registrationPayloadForCase } from '../utils/testData.js';
import { validateAgainstSchema } from '../utils/schemaValidator.js';
import { Given, When, Then } from '../support/hooks.js';

Given('I generate a unique registration payload', async ({ apiState }) => {
  apiState.registrationPayload = generateUniqueRegistrationPayload();
});

Given('I generate a registration payload for contract case {string}', async ({ apiState }, caseName) => {
  apiState.registrationPayload = registrationPayloadForCase(caseName);
  apiState.contractCaseName = caseName;
});

Given('live registration is explicitly enabled', async () => {
  test.skip(process.env.ALLOW_LIVE_REGISTRATION !== 'true', 'Set ALLOW_LIVE_REGISTRATION=true to create a live lead.');
});

When('I validate the request against the local contract', async ({ apiState }) => {
  apiState.schemaResult = await validateAgainstSchema('registration_request.json', apiState.registrationPayload);
});

When('I submit the registration through the API', async ({ apiContext, apiState }) => {
  const client = new RegistrationApiClient({ request: apiContext });
  apiState.registrationSubmitCount = (apiState.registrationSubmitCount ?? 0) + 1;
  apiState.registrationResponse = await client.submitRegistration(apiState.registrationPayload);
});

Then('the registration response has status 201 and matches the documented success schema', async ({ apiState }) => {
  expect(apiState.registrationResponse.status()).toBe(201);
  apiState.registrationBody = await apiState.registrationResponse.json();
  expect(apiState.registrationBody.success).toBe(true);
  const result = await validateAgainstSchema('registration_success.json', apiState.registrationBody);
  expect(result.errors, JSON.stringify(result.errors)).toEqual([]);
  expect(result.valid).toBe(true);
});

Then('the response includes a generated student identifier', async ({ apiState }) => {
  expect(apiState.registrationBody.data.id).toEqual(expect.any(Number));
  expect(apiState.registrationBody.data.id).toBeGreaterThan(0);
});

Then('the lead is not submitted a second time', async ({ apiState }) => {
  expect(apiState.registrationSubmitCount).toBe(1);
});

Then('the local request schema reports the payload as invalid', async ({ apiState }) => {
  expect(apiState.schemaResult.valid).toBe(false);
  expect(apiState.schemaResult.errors.length).toBeGreaterThan(0);
});

Then('the local request schema accepts the payload', async ({ apiState }) => {
  expect(apiState.schemaResult.valid, JSON.stringify(apiState.schemaResult.errors)).toBe(true);
  expect(apiState.schemaResult.errors).toEqual([]);
});

Then('the local request schema reports an error for the contract case', async ({ apiState }) => {
  expect(apiState.schemaResult.valid, `Expected ${apiState.contractCaseName} to be invalid`).toBe(false);
  expect(apiState.schemaResult.errors.length).toBeGreaterThan(0);
});

Then('the schema error points to the invalid field', async ({ apiState }) => {
  const caseName = apiState.contractCaseName;
  const knownFields = ['preferredCountry', 'qualification', 'firstName', 'lastName', 'dateOfBirth', 'gender', 'email', 'mobile', 'whatsapp', 'city', 'state', 'country', 'validAge'];
  const normalizedCase = caseName.replace(/^(missing|null)/, '');
  const field = normalizedCase.toLowerCase().startsWith('date')
    ? 'dateOfBirth'
    : knownFields.find((name) => normalizedCase.toLowerCase().startsWith(name.toLowerCase()));
  expect(field, `No expected field mapping for ${caseName}`).toBeTruthy();
  const pointsToField = apiState.schemaResult.errors.some((error) =>
    error.instancePath.endsWith(`/${field}`) || error.params?.missingProperty === field,
  );
  expect(pointsToField, `${caseName} did not report ${field}: ${JSON.stringify(apiState.schemaResult.errors)}`).toBe(true);
});

Then('the selected example exercises a valid boundary or optional field', async ({ apiState }) => {
  expect(apiState.registrationPayload).toBeDefined();
  expect(apiState.schemaResult.valid).toBe(true);
});

Then('the invalid example remains offline', async ({ apiState }) => {
  expect(apiState.registrationResponse).toBeUndefined();
});

Then('validation does not send a request to the live API', async ({ apiState }) => {
  expect(apiState.registrationResponse).toBeUndefined();
});

Then('no request is sent to the live API for this case', async ({ apiState }) => {
  expect(apiState.registrationResponse).toBeUndefined();
});