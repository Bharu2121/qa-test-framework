import { faker } from '@faker-js/faker';

function alphabeticName(value) {
  const name = value.replace(/[^a-zA-Z ]/g, '').trim().slice(0, 100);
  return name.length >= 2 ? name : 'Test';
}

export function generateUniqueRegistrationPayload() {
  const firstName = alphabeticName(faker.person.firstName());
  const lastName = alphabeticName(faker.person.lastName());
  const mobile = `${faker.helpers.arrayElement(['6', '7', '8', '9'])}${faker.string.numeric(9)}`;
  const birthDate = faker.date.birthdate({ min: 18, max: 40, mode: 'age' });

  return {
    firstName,
    lastName,
    dateOfBirth: birthDate.toISOString().slice(0, 10),
    gender: faker.helpers.arrayElement(['Male', 'Female', 'Prefer not to say']),
    email: `qa.${Date.now()}.${faker.string.alphanumeric(6).toLowerCase()}@example.invalid`,
    mobile,
    whatsapp: null,
    city: (() => {
      const city = faker.location.city().replace(/[^a-zA-Z ]/g, '').slice(0, 100);
      return city.length >= 2 ? city : 'Test City';
    })(),
    state: 'Telangana',
    country: 'India',
    preferredCountry: faker.helpers.arrayElement(['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Ireland']),
    qualification: 'QA test qualification',
  };
}

export function generateInvalidRegistrationPayload(overrides = {}) {
  return { ...generateUniqueRegistrationPayload(), ...overrides };
}

export function registrationPayloadForCase(caseName) {
  const payload = generateUniqueRegistrationPayload();
  const validCases = {
    minimumLengths: () => Object.assign(payload, { firstName: 'Al', lastName: 'Bo', city: 'Li', state: '', preferredCountry: '', qualification: '' }),
    maximumLengths: () => Object.assign(payload, {
      firstName: 'A'.repeat(100), lastName: 'B'.repeat(100), city: 'C'.repeat(100),
      state: 'D'.repeat(100), country: 'E'.repeat(100), preferredCountry: 'F'.repeat(100),
      qualification: 'G'.repeat(255),
    }),
    whatsappOmitted: () => { delete payload.whatsapp; return payload; },
    whatsappNull: () => Object.assign(payload, { whatsapp: null }),
    whatsappEmpty: () => Object.assign(payload, { whatsapp: '' }),
    omitOptionalCountry: () => { delete payload.country; return payload; },
    validAgeTrue: () => Object.assign(payload, { validAge: true }),
    validAgeFalse: () => Object.assign(payload, { validAge: false }),
    genderMale: () => Object.assign(payload, { gender: 'Male' }),
    genderFemale: () => Object.assign(payload, { gender: 'Female' }),
    genderPreferNotToSay: () => Object.assign(payload, { gender: 'Prefer not to say' }),
    mobileStarts6: () => Object.assign(payload, { mobile: `6${'1'.repeat(9)}` }),
    mobileStarts7: () => Object.assign(payload, { mobile: `7${'1'.repeat(9)}` }),
    mobileStarts8: () => Object.assign(payload, { mobile: `8${'1'.repeat(9)}` }),
    mobileStarts9: () => Object.assign(payload, { mobile: `9${'1'.repeat(9)}` }),
  };
  if (validCases[caseName]) return validCases[caseName]();

  const missingRequired = new Set([
    'missingCity', 'missingDateOfBirth', 'missingEmail', 'missingFirstName', 'missingGender',
    'missingLastName', 'missingMobile', 'missingPreferredCountry', 'missingQualification', 'missingState',
  ]);
  if (missingRequired.has(caseName)) {
    const fields = {
      missingCity: 'city', missingDateOfBirth: 'dateOfBirth', missingEmail: 'email',
      missingFirstName: 'firstName', missingGender: 'gender', missingLastName: 'lastName',
      missingMobile: 'mobile', missingPreferredCountry: 'preferredCountry',
      missingQualification: 'qualification', missingState: 'state',
    };
    delete payload[fields[caseName]];
    return payload;
  }

  const invalidCases = {
    nullCity: { city: null }, nullDateOfBirth: { dateOfBirth: null }, nullEmail: { email: null },
    nullFirstName: { firstName: null }, nullGender: { gender: null }, nullLastName: { lastName: null },
    nullMobile: { mobile: null }, nullPreferredCountry: { preferredCountry: null },
    nullQualification: { qualification: null }, nullState: { state: null },
    firstNameEmpty: { firstName: '' }, firstNameOneChar: { firstName: 'A' },
    firstNameTooLong: { firstName: 'A'.repeat(101) }, firstNamePunctuation: { firstName: 'Ann-Marie' },
    lastNameEmpty: { lastName: '' }, lastNameOneChar: { lastName: 'B' },
    lastNameTooLong: { lastName: 'B'.repeat(101) }, lastNamePunctuation: { lastName: "O'Neil" },
    dateUsFormat: { dateOfBirth: '12/31/2000' }, dateNotDate: { dateOfBirth: 'not-a-date' },
    dateEmpty: { dateOfBirth: '' }, genderWrongCase: { gender: 'male' },
    genderUnsupported: { gender: 'Other' }, genderEmpty: { gender: '' },
    emailTooLong: { email: `${'a'.repeat(244)}@example.invalid` }, emailNumber: { email: 123 },
    mobileNineDigits: { mobile: '987654321' }, mobileElevenDigits: { mobile: '98765432101' },
    mobileInvalidPrefix: { mobile: '5876543210' }, mobileLetters: { mobile: 'abcdefghij' },
    mobileEmpty: { mobile: '' }, mobileNumber: { mobile: 9876543210 }, mobileSpaces: { mobile: '987 654 3210' },
    whatsappNineDigits: { whatsapp: '987654321' }, whatsappElevenDigits: { whatsapp: '98765432101' },
    whatsappLetters: { whatsapp: 'abcdefghij' }, whatsappNumber: { whatsapp: 9876543210 },
    cityOneChar: { city: 'X' }, cityTooLong: { city: 'C'.repeat(101) }, cityNumber: { city: 42 },
    stateTooLong: { state: 'S'.repeat(101) }, stateNumber: { state: 42 }, stateBoolean: { state: true },
    countryTooLong: { country: 'C'.repeat(101) }, countryNumber: { country: 1 },
    preferredCountryTooLong: { preferredCountry: 'P'.repeat(101) }, preferredCountryNumber: { preferredCountry: 7 },
    qualificationTooLong: { qualification: 'Q'.repeat(256) }, qualificationNumber: { qualification: 12 },
    validAgeString: { validAge: 'true' },
  };
  if (!invalidCases[caseName]) throw new Error(`Unknown registration contract case: ${caseName}`);
  return Object.assign(payload, invalidCases[caseName]);
}