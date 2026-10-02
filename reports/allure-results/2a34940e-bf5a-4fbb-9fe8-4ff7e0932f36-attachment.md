# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: features/registration/RegistrationUI.feature.spec.js >> Student registration form >> Valid personal information advances to academic details
- Location: .features-gen/features/registration/RegistrationUI.feature.spec.js:24:3

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
                  - textbox "e.g. rahul.sharma@gmail.com" [ref=e222]: qa.ui.1790795842069@example.invalid
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
                - textbox "DD/MM/YYYY (e.g. 2002-05-15)" [ref=e267] [cursor=pointer]
              - paragraph [ref=e268]:
                - img [ref=e269]
                - text: Date of birth is required
            - generic [ref=e271]:
              - generic [ref=e272]:
                - generic [ref=e274]:
                  - text: City
                  - generic [ref=e275]: "*"
                - generic [ref=e277]:
                  - img
                  - textbox "e.g. Eluru, Chennai, Guindy, Hyderabad" [ref=e278]: Test City
              - generic [ref=e279]:
                - generic [ref=e281]:
                  - text: State
                  - generic [ref=e282]: "*"
                - generic [ref=e284]:
                  - combobox [ref=e285] [cursor=pointer]:
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
          - generic [ref=e286]:
            - button "Reset Form" [ref=e288] [cursor=pointer]:
              - img [ref=e289]
              - generic [ref=e292]: Reset Form
            - button "Continue" [active] [ref=e293] [cursor=pointer]:
              - generic [ref=e294]: Continue
              - img [ref=e295]
    - generic [ref=e297]:
      - generic [ref=e298]:
        - img "Logo" [ref=e300]
        - generic [ref=e301]: Jono Consultancy • Official Overseas Education Advisory
      - paragraph [ref=e302]: © 2026 Jono Consultancy. All rights reserved.
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
  12  |   await page.locator('input[name="dateOfBirth"]').fill('12/04/1998');
  13  |   await page.locator('input[name="city"]').fill('Test City');
  14  |   await page.locator('select[name="state"]').selectOption({ label: 'Telangana' });
  15  | }
  16  | 
  17  | async function advanceToAcademicDetails(page) {
  18  |   await fillPersonalInformation(page);
  19  |   await page.getByRole('button', { name: 'Continue' }).click();
  20  |   await expect(page.locator('select[name="qualification"]')).toBeVisible();
  21  | }
  22  | 
  23  | async function advanceToDestinationPreferences(page) {
  24  |   await advanceToAcademicDetails(page);
  25  |   await page.locator('select[name="qualification"]').selectOption({ label: 'Bachelor of Science (B.Sc)' });
  26  |   await page.getByRole('button', { name: 'Continue' }).click();
  27  |   await expect(page.locator('select[name="preferredCountry"]')).toBeVisible();
  28  | }
  29  | 
  30  | Given('I open the public registration form', async ({ page, apiState }) => {
  31  |   apiState.registrationRequests = [];
  32  |   page.on('request', (request) => {
  33  |     if (request.url().includes(registrationEndpoint)) apiState.registrationRequests.push(request);
  34  |   });
  35  |   await page.goto('/');
  36  | });
  37  | 
  38  | When('the registration page finishes loading', async ({ page }) => {
  39  |   await expect(page.getByRole('heading', { name: 'Student Registration Application' })).toBeVisible();
  40  | });
  41  | 
  42  | Then('I see the personal-information inputs and Continue action', async ({ page }) => {
  43  |   for (const field of ['firstName', 'lastName', 'email', 'mobile', 'dateOfBirth', 'city', 'state']) {
  44  |     await expect(page.locator(`[name="${field}"]`)).toBeVisible();
  45  |   }
  46  |   await expect(page.getByRole('radio', { name: 'Prefer not to say' })).toBeVisible();
  47  |   await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
  48  | });
  49  | 
  50  | Then('later wizard steps are not yet available', async ({ page }) => {
  51  |   await expect(page.locator('select[name="qualification"]')).toHaveCount(0);
  52  |   await expect(page.locator('select[name="preferredCountry"]')).toHaveCount(0);
  53  | });
  54  | 
  55  | When('I continue without entering personal information', async ({ page }) => {
  56  |   await page.getByRole('button', { name: 'Continue' }).click();
  57  | });
  58  | 
  59  | Then('the form remains on the personal-information step', async ({ page }) => {
  60  |   await expect(page.locator('input[name="firstName"]')).toBeVisible();
  61  | });
  62  | 
  63  | Then('the academic qualification step is still hidden', async ({ page }) => {
  64  |   await expect(page.locator('select[name="qualification"]')).toHaveCount(0);
  65  | });
  66  | 
  67  | Given('I enter valid synthetic personal information', async ({ page }) => {
  68  |   await fillPersonalInformation(page);
  69  | });
  70  | 
  71  | When('I continue to academic details', async ({ page }) => {
  72  |   await page.getByRole('button', { name: 'Continue' }).click();
  73  | });
  74  | 
  75  | Then('the qualification selector is visible', async ({ page }) => {
> 76  |   await expect(page.locator('select[name="qualification"]')).toBeVisible();
      |                                                              ^ Error: expect(locator).toBeVisible() failed
  77  | });
  78  | 
  79  | Then('the applicant summary shows the synthetic name', async ({ page }) => {
  80  |   await expect(page.getByText('QA UI Example', { exact: false })).toBeVisible();
  81  | });
  82  | 
  83  | When('I return to personal information', async ({ page }) => {
  84  |   await page.getByRole('button', { name: 'Back' }).click();
  85  | });
  86  | 
  87  | Then('the previously entered email and mobile are retained', async ({ page }) => {
  88  |   await expect(page.locator('input[name="email"]')).toHaveValue(/^qa\.ui\..+@example\.invalid$/);
  89  |   await expect(page.locator('input[name="mobile"]')).toHaveValue('9876543210');
  90  | });
  91  | 
  92  | Then('the user can continue editing the application', async ({ page }) => {
  93  |   await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
  94  | });
  95  | 
  96  | Given('I complete personal information and academic details', async ({ page }) => {
  97  |   await advanceToAcademicDetails(page);
  98  |   await page.locator('select[name="qualification"]').selectOption({ label: 'Bachelor of Science (B.Sc)' });
  99  | });
  100 | 
  101 | When('I continue to destination preferences', async ({ page }) => {
  102 |   await page.getByRole('button', { name: 'Continue' }).click();
  103 | });
  104 | 
  105 | When('I choose a qualification and continue to destination preferences', async ({ page }) => {
  106 |   await page.locator('select[name="qualification"]').selectOption({ label: 'Bachelor of Science (B.Sc)' });
  107 |   await page.getByRole('button', { name: 'Continue' }).click();
  108 | });
  109 | 
  110 | Then('the preferred-country selector is visible', async ({ page }) => {
  111 |   await expect(page.locator('select[name="preferredCountry"]')).toBeVisible();
  112 | });
  113 | 
  114 | Then('the final submit action is available', async ({ page }) => {
  115 |   await expect(page.getByRole('button', { name: /Submit & Connect with Expert/ })).toBeVisible();
  116 | });
  117 | 
  118 | Then('the final submit action is not clicked', async ({ page, apiState }) => {
  119 |   await expect(page.getByRole('button', { name: /Submit & Connect with Expert/ })).toBeVisible();
  120 |   expect(apiState.registrationRequests).toHaveLength(0);
  121 | });
  122 | 
  123 | When('I try to submit without choosing a destination', async ({ page }) => {
  124 |   await page.getByRole('button', { name: /Submit & Connect with Expert/ }).click();
  125 | });
  126 | 
  127 | Then('the form stays on destination preferences', async ({ page }) => {
  128 |   await expect(page.locator('select[name="preferredCountry"]')).toBeVisible();
  129 |   await expect(page).not.toHaveURL(/\/success$/);
  130 | });
  131 | 
  132 | Then('a destination validation message is shown', async ({ page }) => {
  133 |   await expect(page.getByText('Please select your preferred study destination')).toBeVisible();
  134 | });
  135 | 
  136 | When('I select Canada as the preferred destination', async ({ page }) => {
  137 |   await page.locator('select[name="preferredCountry"]').selectOption({ label: 'Canada' });
  138 | });
  139 | 
  140 | Then('the destination validation message is not shown', async ({ page }) => {
  141 |   await expect(page.getByText('Please select your preferred study destination')).toHaveCount(0);
  142 | });
  143 | 
  144 | Then('the submit action is available for the user', async ({ page }) => {
  145 |   await expect(page.getByRole('button', { name: /Submit & Connect with Expert/ })).toBeVisible();
  146 | });
  147 | 
  148 | Then('the applicant summary remains visible', async ({ page }) => {
  149 |   await expect(page.getByText('QA UI Example', { exact: false })).toBeVisible();
  150 | });
  151 | 
  152 | Then('the application is not submitted by this scenario', async ({ page, apiState }) => {
  153 |   expect(page.url()).not.toMatch(/\/success$/);
  154 |   expect(apiState.registrationRequests).toHaveLength(0);
  155 | });
  156 | 
  157 | Then('no registration is submitted', async ({ page, apiState }) => {
  158 |   expect(page.url()).not.toMatch(/\/success$/);
  159 |   expect(apiState.registrationRequests).toHaveLength(0);
  160 | });
  161 | 
  162 | Then('no registration request is sent', async ({ page, apiState }) => {
  163 |   expect(page.url()).not.toMatch(/\/success$/);
  164 |   expect(apiState.registrationRequests).toHaveLength(0);
  165 | });
```