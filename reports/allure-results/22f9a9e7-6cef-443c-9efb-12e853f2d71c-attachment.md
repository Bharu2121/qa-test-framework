# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: features/registration/RegistrationUI.feature.spec.js >> Student registration form >> Academic details advance to destination preferences
- Location: .features-gen/features/registration/RegistrationUI.feature.spec.js:41:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('select[name="qualification"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('select[name="qualification"]')

```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - generic [ref=e6]:
      - generic [ref=e7] [cursor=pointer]:
        - img "Jono Consultancy Logo" [ref=e9]
        - generic [ref=e10]:
          - generic [ref=e11]:
            - generic [ref=e12]: Jono Consultancy
            - generic [ref=e13]: Global Admissions
          - paragraph [ref=e14]: Authorized International Education Advisory
      - generic [ref=e15]:
        - button "How It Works" [ref=e16] [cursor=pointer]:
          - img [ref=e17]
          - generic [ref=e20]: How It Works
        - button "Talk to an Expert" [ref=e21] [cursor=pointer]:
          - img [ref=e22]
          - generic [ref=e26]: Talk to an Expert
    - main [ref=e27]:
      - generic [ref=e28]:
        - generic [ref=e29]:
          - generic [ref=e32]: Admissions Open For 2026–2027 Intakes
          - generic [ref=e33]:
            - heading "Launch Your Global Study Abroad Future" [level=1] [ref=e34]:
              - text: Launch Your Global
              - text: Study Abroad Future
            - generic [ref=e37]: Professional guidance. Practical solutions. Proven direction.
          - paragraph [ref=e39]: Get tailored university recommendations, strengthen your student profile, prepare confidently for your visa process, and receive dedicated support throughout your study-abroad journey from start to finish.
          - generic [ref=e40]:
            - generic [ref=e41]:
              - generic [ref=e42]: 500+
              - generic [ref=e43]: Global Universities
            - generic [ref=e44]:
              - generic [ref=e45]: 99.2%
              - generic [ref=e46]: Visa Success
            - generic [ref=e47]:
              - generic [ref=e48]: ₹0
              - generic [ref=e49]: Consultation Fee
          - generic [ref=e50]:
            - button "Talk to an Expert" [ref=e51] [cursor=pointer]:
              - img [ref=e52]
              - generic [ref=e56]: Talk to an Expert
              - img [ref=e57]
            - button "View 6-Step Journey" [ref=e59] [cursor=pointer]:
              - generic [ref=e60]: View 6-Step Journey
              - img [ref=e61]
          - generic [ref=e63]:
            - img [ref=e64]
            - generic [ref=e67]: Certified Mentors · Get a Callback Within 1 Hour · 100% Confidential
        - generic [ref=e71]:
          - generic:
            - generic:
              - generic: Global Education Gateway
      - generic [ref=e73]:
        - generic [ref=e74]:
          - generic [ref=e75]:
            - img [ref=e76]
            - generic [ref=e79]: Step-by-Step Journey
          - heading "Your Roadmap to Studying Abroad" [level=2] [ref=e80]
          - paragraph [ref=e81]: From your first counseling session to landing at your university abroad — we guide you through every milestone.
        - generic [ref=e82]:
          - generic [ref=e85]:
            - generic [ref=e86] [cursor=pointer]:
              - generic [ref=e87]:
                - img [ref=e89]
                - generic [ref=e92]: "#1"
              - generic [ref=e93]: Step 1
              - heading "Submit Inquiry Form" [level=3] [ref=e94]
              - paragraph [ref=e95]: Fill your basic academic history and overseas study preferences.
            - generic [ref=e96] [cursor=pointer]:
              - generic [ref=e97]:
                - img [ref=e99]
                - generic [ref=e103]: "#2"
              - generic [ref=e104]: Step 2
              - heading "Call from Expert Counselor" [level=3] [ref=e105]
              - paragraph [ref=e106]: Our dedicated senior mentor calls you to analyze courses & eligibility.
            - generic [ref=e107] [cursor=pointer]:
              - generic [ref=e108]:
                - img [ref=e110]
                - generic [ref=e113]: "#3"
              - generic [ref=e114]: Step 3
              - heading "Document Review & Shortlisting" [level=3] [ref=e115]
              - paragraph [ref=e116]: We review your academic documents, test scores, and profile to recommend suitable universities.
            - generic [ref=e117] [cursor=pointer]:
              - generic [ref=e118]:
                - img [ref=e120]
                - generic [ref=e123]: "#4"
              - generic [ref=e124]: Step 4
              - heading "University Applications & Admissions" [level=3] [ref=e125]
              - paragraph [ref=e126]: We assist with university applications and help you secure official offer letters.
            - generic [ref=e127] [cursor=pointer]:
              - generic [ref=e128]:
                - img [ref=e130]
                - generic [ref=e133]: "#5"
              - generic [ref=e134]: Step 5
              - heading "Visa & Financial Guidance" [level=3] [ref=e135]
              - paragraph [ref=e136]: End-to-end support for visa documentation, financial requirements, and interview preparation.
            - generic [ref=e137] [cursor=pointer]:
              - generic [ref=e138]:
                - img [ref=e140]
                - generic [ref=e142]: "#6"
              - generic [ref=e143]: Destination
              - heading "Fly & Study Abroad!" [level=3] [ref=e144]
              - paragraph [ref=e145]: Pre-departure briefing, flight & accommodation assistance at destination.
          - 'button "Start Step 1: Connect with a Counselor Now" [ref=e147] [cursor=pointer]':
            - img [ref=e148]
            - generic [ref=e152]: "Start Step 1: Connect with a Counselor Now"
            - img [ref=e153]
      - generic [ref=e157]:
        - generic [ref=e158]:
          - generic [ref=e159]:
            - img [ref=e160]
            - generic [ref=e162]: Talk to an Expert · Free 1-on-1 Consultation
          - heading "Student Registration Application" [level=2] [ref=e163]
          - paragraph [ref=e164]: Complete these 3 quick steps to get connected with your senior study abroad advisor
        - generic [ref=e166]:
          - button "1 Step 1 Personal Info" [ref=e167] [cursor=pointer]:
            - generic [ref=e168]: "1"
            - generic [ref=e169]:
              - generic [ref=e170]: Step 1
              - generic [ref=e171]: Personal Info
          - button "2 Step 2 Academics" [disabled] [ref=e172]:
            - generic [ref=e173]: "2"
            - generic [ref=e174]:
              - generic [ref=e175]: Step 2
              - generic [ref=e176]: Academics
          - button "3 Step 3 Preferences" [disabled] [ref=e177]:
            - generic [ref=e178]: "3"
            - generic [ref=e179]:
              - generic [ref=e180]: Step 3
              - generic [ref=e181]: Preferences
        - generic [ref=e183]:
          - img [ref=e184]
          - generic [ref=e187]:
            - text: "Applicant:"
            - strong [ref=e188]: QA UI Example
        - generic [ref=e189]:
          - generic [ref=e190]:
            - generic [ref=e191]:
              - generic [ref=e192]:
                - generic [ref=e194]:
                  - text: First Name
                  - generic [ref=e195]: "*"
                - generic [ref=e197]:
                  - img [ref=e198]
                  - textbox "e.g. Rahul" [ref=e201]: QA
              - generic [ref=e202]:
                - generic [ref=e204]:
                  - text: Last Name
                  - generic [ref=e205]: "*"
                - generic [ref=e207]:
                  - img [ref=e208]
                  - textbox "e.g. Sharma" [ref=e211]: UI Example
            - generic [ref=e212]:
              - generic [ref=e213]:
                - generic [ref=e215]:
                  - text: Email Address
                  - generic [ref=e216]: "*"
                - generic [ref=e218]:
                  - img [ref=e219]
                  - textbox "e.g. rahul.sharma@gmail.com" [ref=e222]: qa.ui.1790795411819@example.invalid
              - generic [ref=e223]:
                - generic [ref=e225]:
                  - text: Mobile Number (10 Digits)
                  - generic [ref=e226]: "*"
                - generic [ref=e228]:
                  - generic [ref=e229]: "+91"
                  - textbox "9876543210" [ref=e230]
            - generic [ref=e231]:
              - generic [ref=e232]:
                - generic [ref=e233]:
                  - generic [ref=e234]: WhatsApp Number (Optional)
                  - generic [ref=e235] [cursor=pointer]:
                    - checkbox "Same as mobile" [ref=e236]
                    - generic [ref=e237]: Same as mobile
                - generic [ref=e238]:
                  - generic [ref=e239]: "+91"
                  - textbox "9876543210" [ref=e240]
              - generic [ref=e241]:
                - generic [ref=e243]:
                  - text: Gender
                  - generic [ref=e244]: "*"
                - generic [ref=e246]:
                  - generic [ref=e247] [cursor=pointer]:
                    - radio "Male" [ref=e248]
                    - generic [ref=e250]: Male
                  - generic [ref=e251] [cursor=pointer]:
                    - radio "Female" [ref=e252]
                    - generic [ref=e254]: Female
                  - generic [ref=e255] [cursor=pointer]:
                    - radio "Prefer not to say" [ref=e256]
                    - generic [ref=e258]: Prefer not to say
                - paragraph [ref=e259]:
                  - img [ref=e260]
                  - text: Please select your gender
            - generic [ref=e263]:
              - generic [ref=e265]:
                - text: Date of Birth
                - generic [ref=e266]: "*"
              - generic [ref=e268]:
                - img
                - textbox "DD/MM/YYYY (e.g. 2002-05-15)" [ref=e269] [cursor=pointer]
              - paragraph [ref=e270]:
                - img [ref=e271]
                - text: Date of birth is required
            - generic [ref=e273]:
              - generic [ref=e274]:
                - generic [ref=e276]:
                  - text: City
                  - generic [ref=e277]: "*"
                - generic [ref=e279]:
                  - img
                  - textbox "e.g. Eluru, Chennai, Guindy, Hyderabad" [ref=e280]: Test City
              - generic [ref=e281]:
                - generic [ref=e283]:
                  - text: State
                  - generic [ref=e284]: "*"
                - generic [ref=e286]:
                  - combobox [ref=e287] [cursor=pointer]:
                    - option "-- Select State --"
                    - option "Andhra Pradesh"
                    - option "Arunachal Pradesh"
                    - option "Assam"
                    - option "Bihar"
                    - option "Chhattisgarh"
                    - option "Goa"
                    - option "Gujarat"
                    - option "Haryana"
                    - option "Himachal Pradesh"
                    - option "Jharkhand"
                    - option "Karnataka"
                    - option "Kerala"
                    - option "Madhya Pradesh"
                    - option "Maharashtra"
                    - option "Manipur"
                    - option "Meghalaya"
                    - option "Mizoram"
                    - option "Nagaland"
                    - option "Odisha"
                    - option "Punjab"
                    - option "Rajasthan"
                    - option "Sikkim"
                    - option "Tamil Nadu"
                    - option "Telangana" [selected]
                    - option "Tripura"
                    - option "Uttar Pradesh"
                    - option "Uttarakhand"
                    - option "West Bengal"
                    - option "Andaman and Nicobar Islands"
                    - option "Chandigarh"
                    - option "Dadra and Nagar Haveli and Daman and Diu"
                    - option "Delhi (NCT)"
                    - option "Jammu and Kashmir"
                    - option "Ladakh"
                    - option "Lakshadweep"
                    - option "Puducherry"
                  - img
          - generic [ref=e288]:
            - button "Reset Form" [ref=e290] [cursor=pointer]:
              - img [ref=e291]
              - generic [ref=e294]: Reset Form
            - button "Continue" [active] [ref=e295] [cursor=pointer]:
              - generic [ref=e296]: Continue
              - img [ref=e297]
    - generic [ref=e299]:
      - generic [ref=e300]:
        - img "Logo" [ref=e302]
        - generic [ref=e303]: Jono Consultancy • Official Overseas Education Advisory
      - paragraph [ref=e304]: © 2026 Jono Consultancy. All rights reserved.
```

# Test source

```ts
  1   | import { expect } from '@playwright/test';
  2   | import { Given, When, Then } from '../support/hooks.js';
  3   | 
  4   | const registrationEndpoint = '/api/v1/students/register';
  5   | 
  6   | async function fillPersonalInformation(page) {
  7   |   await page.locator('input[name="firstName"]').fill('QA');
  8   |   await page.locator('input[name="lastName"]').fill('UI Example');
  9   |   await page.locator('input[name="email"]').fill(`qa.ui.${Date.now()}@example.invalid`);
  10  |   await page.locator('input[name="mobile"]').fill('9876543210');
  11  |   await page.locator('input[name="dateOfBirth"]').fill('1998-04-12');
  12  |   await page.locator('input[name="city"]').fill('Test City');
  13  |   await page.locator('select[name="state"]').selectOption({ label: 'Telangana' });
  14  | }
  15  | 
  16  | async function advanceToAcademicDetails(page) {
  17  |   await fillPersonalInformation(page);
  18  |   await page.getByRole('button', { name: 'Continue' }).click();
> 19  |   await expect(page.locator('select[name="qualification"]')).toBeVisible();
      |                                                              ^ Error: expect(locator).toBeVisible() failed
  20  | }
  21  | 
  22  | async function advanceToDestinationPreferences(page) {
  23  |   await advanceToAcademicDetails(page);
  24  |   await page.locator('select[name="qualification"]').selectOption({ label: 'Bachelor of Science (B.Sc)' });
  25  |   await page.getByRole('button', { name: 'Continue' }).click();
  26  |   await expect(page.locator('select[name="preferredCountry"]')).toBeVisible();
  27  | }
  28  | 
  29  | Given('I open the public registration form', async ({ page, apiState }) => {
  30  |   apiState.registrationRequests = [];
  31  |   page.on('request', (request) => {
  32  |     if (request.url().includes(registrationEndpoint)) apiState.registrationRequests.push(request);
  33  |   });
  34  |   await page.goto('/');
  35  | });
  36  | 
  37  | When('the registration page finishes loading', async ({ page }) => {
  38  |   await expect(page.getByRole('heading', { name: 'Student Registration Application' })).toBeVisible();
  39  | });
  40  | 
  41  | Then('I see the personal-information inputs and Continue action', async ({ page }) => {
  42  |   for (const field of ['firstName', 'lastName', 'email', 'mobile', 'dateOfBirth', 'city', 'state']) {
  43  |     await expect(page.locator(`[name="${field}"]`)).toBeVisible();
  44  |   }
  45  |   await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
  46  | });
  47  | 
  48  | Then('later wizard steps are not yet available', async ({ page }) => {
  49  |   await expect(page.locator('select[name="qualification"]')).toHaveCount(0);
  50  |   await expect(page.locator('select[name="preferredCountry"]')).toHaveCount(0);
  51  | });
  52  | 
  53  | When('I continue without entering personal information', async ({ page }) => {
  54  |   await page.getByRole('button', { name: 'Continue' }).click();
  55  | });
  56  | 
  57  | Then('the form remains on the personal-information step', async ({ page }) => {
  58  |   await expect(page.locator('input[name="firstName"]')).toBeVisible();
  59  | });
  60  | 
  61  | Then('the academic qualification step is still hidden', async ({ page }) => {
  62  |   await expect(page.locator('select[name="qualification"]')).toHaveCount(0);
  63  | });
  64  | 
  65  | Given('I enter valid synthetic personal information', async ({ page }) => {
  66  |   await fillPersonalInformation(page);
  67  | });
  68  | 
  69  | When('I continue to academic details', async ({ page }) => {
  70  |   await page.getByRole('button', { name: 'Continue' }).click();
  71  | });
  72  | 
  73  | Then('the qualification selector is visible', async ({ page }) => {
  74  |   await expect(page.locator('select[name="qualification"]')).toBeVisible();
  75  | });
  76  | 
  77  | Then('the applicant summary shows the synthetic name', async ({ page }) => {
  78  |   await expect(page.getByText('QA UI Example', { exact: false })).toBeVisible();
  79  | });
  80  | 
  81  | When('I return to personal information', async ({ page }) => {
  82  |   await page.getByRole('button', { name: 'Back' }).click();
  83  | });
  84  | 
  85  | Then('the previously entered email and mobile are retained', async ({ page }) => {
  86  |   await expect(page.locator('input[name="email"]')).toHaveValue(/^qa\.ui\..+@example\.invalid$/);
  87  |   await expect(page.locator('input[name="mobile"]')).toHaveValue('9876543210');
  88  | });
  89  | 
  90  | Then('the user can continue editing the application', async ({ page }) => {
  91  |   await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
  92  | });
  93  | 
  94  | Given('I complete personal information and academic details', async ({ page }) => {
  95  |   await advanceToAcademicDetails(page);
  96  |   await page.locator('select[name="qualification"]').selectOption({ label: 'Bachelor of Science (B.Sc)' });
  97  | });
  98  | 
  99  | When('I continue to destination preferences', async ({ page }) => {
  100 |   await page.getByRole('button', { name: 'Continue' }).click();
  101 | });
  102 | 
  103 | When('I choose a qualification and continue to destination preferences', async ({ page }) => {
  104 |   await page.locator('select[name="qualification"]').selectOption({ label: 'Bachelor of Science (B.Sc)' });
  105 |   await page.getByRole('button', { name: 'Continue' }).click();
  106 | });
  107 | 
  108 | Then('the preferred-country selector is visible', async ({ page }) => {
  109 |   await expect(page.locator('select[name="preferredCountry"]')).toBeVisible();
  110 | });
  111 | 
  112 | Then('the final submit action is available', async ({ page }) => {
  113 |   await expect(page.getByRole('button', { name: /Submit & Connect with Expert/ })).toBeVisible();
  114 | });
  115 | 
  116 | Then('the final submit action is not clicked', async ({ page, apiState }) => {
  117 |   await expect(page.getByRole('button', { name: /Submit & Connect with Expert/ })).toBeVisible();
  118 |   expect(apiState.registrationRequests).toHaveLength(0);
  119 | });
```