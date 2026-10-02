# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: features/admin/AdminLeads.feature.spec.js >> Administrator student lead API >> An administrator can read their own profile
- Location: .features-gen/features/admin/AdminLeads.feature.spec.js:34:3

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 401
```

# Test source

```ts
  10  | When('I request the first page of admin leads', async ({ apiContext, apiState }) => {
  11  |   const client = new AdminLeadsApiClient({ request: apiContext });
  12  |   apiState.leadsResponse = await client.listLeads({
  13  |     headers: apiState.authHeaders,
  14  |     params: { page: 0, size: 20 },
  15  |   });
  16  | });
  17  | 
  18  | When('I request admin leads without credentials', async ({ apiContext, apiState }) => {
  19  |   const client = new AdminLeadsApiClient({ request: apiContext });
  20  |   apiState.unauthenticatedLeadsResponse = await client.listLeads({ params: { page: 0, size: 1 } });
  21  | });
  22  | 
  23  | Then('the unauthenticated leads response has status 401', async ({ apiState }) => {
  24  |   expect(apiState.unauthenticatedLeadsResponse.status()).toBe(401);
  25  | });
  26  | 
  27  | Then('the leads response has status 200 and matches the documented schema', async ({ apiState }) => {
  28  |   expect(apiState.leadsResponse.status()).toBe(200);
  29  |   const body = await apiState.leadsResponse.json();
  30  |   const result = await validateAgainstSchema('leads_list.json', body);
  31  |   expect(result.errors, JSON.stringify(result.errors)).toEqual([]);
  32  |   expect(result.valid).toBe(true);
  33  |   expect(body.data.content).toEqual(expect.any(Array));
  34  |   apiState.leadsBody = body;
  35  | });
  36  | 
  37  | Then('the first page includes valid pagination metadata', async ({ apiState }) => {
  38  |   expect(apiState.leadsBody.data.page).toBe(0);
  39  |   expect(apiState.leadsBody.data.size).toBeGreaterThan(0);
  40  |   expect(apiState.leadsBody.data.totalElements).toBeGreaterThanOrEqual(0);
  41  |   expect(apiState.leadsBody.data.totalPages).toBeGreaterThanOrEqual(0);
  42  | });
  43  | 
  44  | When('I search admin leads for the known synthetic email', async ({ apiContext, apiState }) => {
  45  |   const client = new AdminLeadsApiClient({ request: apiContext });
  46  |   apiState.knownSyntheticLeads = await client.searchLeadsByEmail(knownSyntheticEmail, {
  47  |     headers: apiState.authHeaders,
  48  |   });
  49  | });
  50  | 
  51  | Then('the known synthetic lead is returned exactly once', async ({ apiState }) => {
  52  |   expect(apiState.knownSyntheticLeads).toHaveLength(1);
  53  | });
  54  | 
  55  | Then('its reference fields match the submitted test data', async ({ apiState }) => {
  56  |   const lead = apiState.knownSyntheticLeads[0];
  57  |   expect(lead.id).toBe(knownSyntheticStudentId);
  58  |   expect(lead.firstName).toBe('QA Example');
  59  |   expect(lead.lastName).toBe('Automation');
  60  |   expect(lead.email).toBe(knownSyntheticEmail);
  61  |   expect(lead.mobile).toBe('9876543210');
  62  |   expect(lead.preferredCountry).toBe('Canada');
  63  | });
  64  | 
  65  | When('I open the known synthetic lead detail', async ({ apiContext, apiState }) => {
  66  |   const client = new AdminLeadsApiClient({ request: apiContext });
  67  |   apiState.leadDetailResponse = await client.getLeadDetail(knownSyntheticStudentId, {
  68  |     headers: apiState.authHeaders,
  69  |   });
  70  | });
  71  | 
  72  | Then('the lead detail response has status 200 and matches the documented schema', async ({ apiState }) => {
  73  |   expect(apiState.leadDetailResponse.status()).toBe(200);
  74  |   apiState.leadDetailBody = await apiState.leadDetailResponse.json();
  75  |   const result = await validateAgainstSchema('lead_detail.json', apiState.leadDetailBody);
  76  |   expect(result.errors, JSON.stringify(result.errors)).toEqual([]);
  77  |   expect(result.valid).toBe(true);
  78  | });
  79  | 
  80  | Then('the detail belongs to the known synthetic registration', async ({ apiState }) => {
  81  |   expect(apiState.leadDetailBody.data.id).toBe(knownSyntheticStudentId);
  82  |   expect(apiState.leadDetailBody.data.email).toBe(knownSyntheticEmail);
  83  | });
  84  | 
  85  | When('I request the admin dashboard statistics', async ({ apiContext, apiState }) => {
  86  |   const client = new AdminLeadsApiClient({ request: apiContext });
  87  |   apiState.dashboardStatsResponse = await client.getDashboardStats({ headers: apiState.authHeaders });
  88  | });
  89  | 
  90  | Then('the dashboard statistics response matches its documented schema', async ({ apiState }) => {
  91  |   expect(apiState.dashboardStatsResponse.status()).toBe(200);
  92  |   apiState.dashboardStatsBody = await apiState.dashboardStatsResponse.json();
  93  |   const result = await validateAgainstSchema('dashboard_stats.json', apiState.dashboardStatsBody);
  94  |   expect(result.errors, JSON.stringify(result.errors)).toEqual([]);
  95  |   expect(result.valid).toBe(true);
  96  | });
  97  | 
  98  | Then('all reported counters are zero or greater', async ({ apiState }) => {
  99  |   const counters = Object.values(apiState.dashboardStatsBody.data);
  100 |   expect(counters.length).toBeGreaterThan(0);
  101 |   for (const count of counters) expect(count).toBeGreaterThanOrEqual(0);
  102 | });
  103 | 
  104 | When('I request the authenticated admin profile', async ({ apiContext, apiState }) => {
  105 |   const client = new AdminAuthApiClient({ request: apiContext });
  106 |   apiState.adminProfileResponse = await client.getProfile({ headers: apiState.authHeaders });
  107 | });
  108 | 
  109 | Then('the profile response matches its documented schema', async ({ apiState }) => {
> 110 |   expect(apiState.adminProfileResponse.status()).toBe(200);
      |                                                  ^ Error: expect(received).toBe(expected) // Object.is equality
  111 |   apiState.adminProfileBody = await apiState.adminProfileResponse.json();
  112 |   const result = await validateAgainstSchema('admin_profile.json', apiState.adminProfileBody);
  113 |   expect(result.errors, JSON.stringify(result.errors)).toEqual([]);
  114 |   expect(result.valid).toBe(true);
  115 | });
  116 | 
  117 | Then('the profile email matches the configured admin email', async ({ apiState }) => {
  118 |   expect(apiState.adminProfileBody.data.email === process.env.ADMIN_USER).toBe(true);
  119 | });
```