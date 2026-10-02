# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: features/registration/RegistrationUI.feature.spec.js >> Student registration form >> Valid personal information advances to academic details
- Location: .features-gen/features/registration/RegistrationUI.feature.spec.js:24:3

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator:  locator('input[name="dateOfBirth"]')
Expected: "1998-04-12"
Received: ""
Timeout:  5000ms

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for locator('input[name="dateOfBirth"]')
    9 × locator resolved to <input value="" type="date" max="2026-09-30" name="dateOfBirth" placeholder="DD/MM/YYYY (e.g. 2002-05-15)" class="w-full max-w-full min-w-0 pl-11 pr-4 py-3 rounded-xl input-3d text-sm cursor-pointer [color-scheme:dark]"/>
      - unexpected value ""

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
                  - textbox "e.g. rahul.sharma@gmail.com" [ref=e222]: qa.ui.1790795894828@example.invalid
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
                    - radio "Prefer not to say" [checked] [ref=e256]
                    - generic [ref=e259]: Prefer not to say
            - generic [ref=e261]:
              - generic [ref=e263]:
                - text: Date of Birth
                - generic [ref=e264]: "*"
              - generic [ref=e266]:
                - img
                - textbox [active] [ref=e267] [cursor=pointer]:
                  - /placeholder: DD/MM/YYYY (e.g. 2002-05-15)
            - generic [ref=e268]:
              - generic [ref=e269]:
                - generic [ref=e271]:
                  - text: City
                  - generic [ref=e272]: "*"
                - generic [ref=e274]:
                  - img
                  - textbox "e.g. Eluru, Chennai, Guindy, Hyderabad" [ref=e275]
              - generic [ref=e276]:
                - generic [ref=e278]:
                  - text: State
                  - generic [ref=e279]: "*"
                - generic [ref=e281]:
                  - combobox [ref=e282] [cursor=pointer]:
                    - option "-- Select State --" [selected]
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
                    - option "Telangana"
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
          - generic [ref=e283]:
            - button "Reset Form" [ref=e285] [cursor=pointer]:
              - img [ref=e286]
              - generic [ref=e289]: Reset Form
            - button "Continue" [ref=e290] [cursor=pointer]:
              - generic [ref=e291]: Continue
              - img [ref=e292]
    - generic [ref=e294]:
      - generic [ref=e295]:
        - img "Logo" [ref=e297]
        - generic [ref=e298]: Jono Consultancy • Official Overseas Education Advisory
      - paragraph [ref=e299]: © 2026 Jono Consultancy. All rights reserved.
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
  11  |   await page.getByText('Prefer not to say', { exact: true }).click();
  12  |   await page.locator('input[name="dateOfBirth"]').fill('1998-04-12');
> 13  |   await expect(page.locator('input[name="dateOfBirth"]')).toHaveValue('1998-04-12');
      |                                                           ^ Error: expect(locator).toHaveValue(expected) failed
  14  |   await page.locator('input[name="city"]').fill('Test City');
  15  |   await page.locator('select[name="state"]').selectOption({ label: 'Telangana' });
  16  | }
  17  | 
  18  | async function advanceToAcademicDetails(page) {
  19  |   await fillPersonalInformation(page);
  20  |   await page.getByRole('button', { name: 'Continue' }).click();
  21  |   await expect(page.locator('select[name="qualification"]')).toBeVisible();
  22  | }
  23  | 
  24  | async function advanceToDestinationPreferences(page) {
  25  |   await advanceToAcademicDetails(page);
  26  |   await page.locator('select[name="qualification"]').selectOption({ label: 'Bachelor of Science (B.Sc)' });
  27  |   await page.getByRole('button', { name: 'Continue' }).click();
  28  |   await expect(page.locator('select[name="preferredCountry"]')).toBeVisible();
  29  | }
  30  | 
  31  | Given('I open the public registration form', async ({ page, apiState }) => {
  32  |   apiState.registrationRequests = [];
  33  |   page.on('request', (request) => {
  34  |     if (request.url().includes(registrationEndpoint)) apiState.registrationRequests.push(request);
  35  |   });
  36  |   await page.goto('/');
  37  | });
  38  | 
  39  | When('the registration page finishes loading', async ({ page }) => {
  40  |   await expect(page.getByRole('heading', { name: 'Student Registration Application' })).toBeVisible();
  41  | });
  42  | 
  43  | Then('I see the personal-information inputs and Continue action', async ({ page }) => {
  44  |   for (const field of ['firstName', 'lastName', 'email', 'mobile', 'dateOfBirth', 'city', 'state']) {
  45  |     await expect(page.locator(`[name="${field}"]`)).toBeVisible();
  46  |   }
  47  |   await expect(page.getByRole('radio', { name: 'Prefer not to say' })).toBeVisible();
  48  |   await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
  49  | });
  50  | 
  51  | Then('later wizard steps are not yet available', async ({ page }) => {
  52  |   await expect(page.locator('select[name="qualification"]')).toHaveCount(0);
  53  |   await expect(page.locator('select[name="preferredCountry"]')).toHaveCount(0);
  54  | });
  55  | 
  56  | When('I continue without entering personal information', async ({ page }) => {
  57  |   await page.getByRole('button', { name: 'Continue' }).click();
  58  | });
  59  | 
  60  | Then('the form remains on the personal-information step', async ({ page }) => {
  61  |   await expect(page.locator('input[name="firstName"]')).toBeVisible();
  62  | });
  63  | 
  64  | Then('the academic qualification step is still hidden', async ({ page }) => {
  65  |   await expect(page.locator('select[name="qualification"]')).toHaveCount(0);
  66  | });
  67  | 
  68  | Given('I enter valid synthetic personal information', async ({ page }) => {
  69  |   await fillPersonalInformation(page);
  70  | });
  71  | 
  72  | When('I continue to academic details', async ({ page }) => {
  73  |   await page.getByRole('button', { name: 'Continue' }).click();
  74  | });
  75  | 
  76  | Then('the qualification selector is visible', async ({ page }) => {
  77  |   await expect(page.locator('select[name="qualification"]')).toBeVisible();
  78  | });
  79  | 
  80  | Then('the applicant summary shows the synthetic name', async ({ page }) => {
  81  |   await expect(page.getByText('QA UI Example', { exact: false })).toBeVisible();
  82  | });
  83  | 
  84  | When('I return to personal information', async ({ page }) => {
  85  |   await page.getByRole('button', { name: 'Back' }).click();
  86  | });
  87  | 
  88  | Then('the previously entered email and mobile are retained', async ({ page }) => {
  89  |   await expect(page.locator('input[name="email"]')).toHaveValue(/^qa\.ui\..+@example\.invalid$/);
  90  |   await expect(page.locator('input[name="mobile"]')).toHaveValue('9876543210');
  91  | });
  92  | 
  93  | Then('the user can continue editing the application', async ({ page }) => {
  94  |   await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
  95  | });
  96  | 
  97  | Given('I complete personal information and academic details', async ({ page }) => {
  98  |   await advanceToAcademicDetails(page);
  99  |   await page.locator('select[name="qualification"]').selectOption({ label: 'Bachelor of Science (B.Sc)' });
  100 | });
  101 | 
  102 | When('I continue to destination preferences', async ({ page }) => {
  103 |   await page.getByRole('button', { name: 'Continue' }).click();
  104 | });
  105 | 
  106 | When('I choose a qualification and continue to destination preferences', async ({ page }) => {
  107 |   await page.locator('select[name="qualification"]').selectOption({ label: 'Bachelor of Science (B.Sc)' });
  108 |   await page.getByRole('button', { name: 'Continue' }).click();
  109 | });
  110 | 
  111 | Then('the preferred-country selector is visible', async ({ page }) => {
  112 |   await expect(page.locator('select[name="preferredCountry"]')).toBeVisible();
  113 | });
```