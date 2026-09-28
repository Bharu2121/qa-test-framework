# API Inventory

Sources: live OpenAPI document at `https://api.jonoconsultancy.com/v3/api-docs`, public form traffic, and one mock login attempt, reviewed 2026-09-27. One clearly fake registration was submitted and one invalid mock login attempted. No real admin credentials were used.

## Public registration

| Item | Documented contract |
| --- | --- |
| Operation | `POST https://api.jonoconsultancy.com/api/v1/students/register` (`registerStudent`) |
| Purpose | Registration/upsert; existing email updates details while preserving status; new records receive `received` status |
| Request | Required JSON body; schema `StudentRegistrationRequest` below |
| Success | OpenAPI says HTTP 200. Observed response was HTTP 201, `ApiResponseStudentResponse` with `success: true`, confirmation message, student data, and timestamp. |
| Validation errors | Status, message/body, and validation timing are not documented; no invalid live requests were sent |
| Headers/tokens | Observed JSON request with `Content-Type: application/json`; no `Authorization` header or CSRF token. The public call succeeded without auth. |
| Anti-CSRF/rate limit/CAPTCHA | Not documented or runtime-tested |

### Public form and network observation

The public page presents a three-step wizard. Visible inputs were named `firstName`, `lastName`, `email`, `mobile`, `whatsapp`, `dateOfBirth`, `city`, `state`, `qualification`, and `preferredCountry`. `whatsapp` is optional. There was no visible gender input; the observed request supplied `gender: "Male"`, so the page likely supplies a default, although its source is not confirmed.

One clearly fake record was submitted once. Observed request: `POST https://api.jonoconsultancy.com/api/v1/students/register`, JSON body fields `firstName`, `lastName`, `dateOfBirth`, `gender`, `email`, `mobile`, `whatsapp`, `city`, `state`, `country`, `preferredCountry`, and `qualification`; `whatsapp` was `null`. Relevant headers included `Content-Type: application/json`, origin `https://jonoconsultancy.com`, and referer `https://jonoconsultancy.com/`; there was no auth header. The response was HTTP 201, `success: true`, message `Thank you! Your registration has been received successfully.`, student id `21`, `leadStatus: "received"`, and UI reference `JONO-21`. `createdAt`, `updatedAt`, and wrapper `timestamp` were strings with fractional seconds but no timezone suffix, despite the OpenAPI date-time declaration. The UI navigated to `/success` and displayed Canada as destination. Do not submit this fixture again: registration is an upsert by email.

### `StudentRegistrationRequest`

Required: `city`, `dateOfBirth`, `email`, `firstName`, `gender`, `lastName`, `mobile`, `preferredCountry`, `qualification`, `state`.

| Field | Type | Constraints | Required |
| --- | --- | --- | --- |
| `firstName` | string | 2-100 chars; letters/spaces | yes |
| `lastName` | string | 2-100 chars; letters/spaces | yes |
| `dateOfBirth` | string | date | yes |
| `gender` | string | `Male`, `Female`, or `Prefer not to say` | yes |
| `email` | string | max 255 chars | yes |
| `mobile` | string | `^[6-9]\\d{9}$` | yes |
| `whatsapp` | string | optional; empty or `^[6-9]\\d{9}$` | no |
| `city` | string | 2-100 chars | yes |
| `state` | string | max 100 chars | yes |
| `country` | string | max 100 chars | no |
| `preferredCountry` | string | max 100 chars | yes |
| `qualification` | string | max 255 chars | yes |
| `validAge` | boolean | no additional constraint | no |

Success wrapper fields documented: `success` (boolean), `message` (string), `data` (`StudentResponse`), `timestamp` (date-time). Student response properties include `id`, `firstName`, `lastName`, `fullName`, `dateOfBirth`, `gender`, `email`, `mobile`, `whatsapp`, `city`, `state`, `country`, `preferredCountry`, `qualification`, `leadStatus`, `createdAt`, `updatedAt`. The OpenAPI response schemas do not declare required response properties.

## Admin authentication

| Item | Documented contract |
| --- | --- |
| Operation | `POST https://api.jonoconsultancy.com/api/v1/auth/login` (`login`) |
| Request | `AdminLoginRequest`: required `email` (string), `password` (string) |
| Success | OpenAPI and live test returned HTTP 200, `ApiResponseAdminLoginResponse`; `data` includes `token`, `tokenType`, `expiresAt`, `username`, `email`, `profilePictureUrl` |
| Failure | One invalid mock attempt returned HTTP 401 with `success: false` and message `Invalid email or password` (the raw message had trailing whitespace) |
| Auth | HTTP bearer JWT (`BearerAuth`); token expiry is returned as `expiresAt` |
| Security declaration caveat | The document applies global `BearerAuth` to login without an override, but the endpoint accepted an unauthenticated invalid-credential request and returned 401. |
| Logout/invalidation | No logout operation is listed in the published OpenAPI document |

No usable admin account was provided. Tests read `ADMIN_USER` and `ADMIN_PASS` from the environment and skip credential-dependent scenarios when either is absent. Mock credentials were rejected; protected admin list/detail testing requires a valid authorized account.

## Admin students

| Item | Documented contract |
| --- | --- |
| List | `GET https://api.jonoconsultancy.com/api/v1/admin/students` (`getAllStudents`), bearer JWT required |
| Query parameters | `page` (integer, default 0), `size` (integer, default 20), `search` (string; searches name/email/mobile), `status` (string) |
| List success | OpenAPI and live test returned HTTP 200, `ApiResponsePageResponseStudentResponse`; `data.content` contains `StudentResponse` objects and `data` has `page`, `size`, `totalElements`, `totalPages`, `last` |
| Detail | `GET https://api.jonoconsultancy.com/api/v1/admin/students/{id}`, bearer JWT required; `id` is integer/int64 |
| Detail success | OpenAPI and live read of the synthetic test record returned HTTP 200, `ApiResponseStudentResponse` |
| Error responses | One unauthenticated list call returned HTTP 401 with an HTML `HTTP Status 401 – Unauthorized` page. Not-found and search-no-match responses remain unobserved. |

Additional authenticated GET checks passed for `/api/v1/admin/dashboard/stats` and `/api/v1/auth/profile` (HTTP 200). The admin portal UI login also reached the authenticated dashboard. Search by the synthetic registration email returned exactly one record and the detail read matched that registration. A further explicitly authorized live E2E run on 2026-09-28 created one synthetic record (id `22`) and verified registration HTTP 201, admin search HTTP 200, and detail HTTP 200. No update, archive, restore, permanent-delete, password-change, or recovery operation was performed.

The public and admin-side field names in the documented registration and student response shapes are identical (`firstName`, `lastName`, `email`, `mobile`, etc.). This mapping comes from OpenAPI, not a live submission cross-check. The admin website is `https://admin.jonoconsultancy.com`; API requests use the API host above.

## Potential defect: conflicting XSS protection headers

- **Preconditions:** None; an unauthenticated `HEAD` request to `/api/v1/auth/profile` on the authorized production API.
- **Test steps:** Send `HEAD https://api.jonoconsultancy.com/api/v1/auth/profile` without credentials and inspect response headers only.
- **Input:** No body, token, or account data.
- **Expected:** At most one unambiguous `X-XSS-Protection` policy value.
- **Actual:** HTTP 401 response included both `X-XSS-Protection: 0` and `X-XSS-Protection: 1; mode=block`. Reproduced by curl and the Playwright `@ProductionSafeProbe` test on 2026-09-28; the test fails as intended.
- **Severity:** Low, provisional. The values conflict, but this legacy header is ignored by modern browsers; no exploit was demonstrated.
- **Evidence:** Sanitized HEAD response headers and failing Playwright assertion. No response body was read.
- **Why this may be a defect:** Multiple security layers appear to emit contradictory policy for the same header, so clients may interpret a different value than intended.
- **Suggested investigation:** Compare application security-header configuration with reverse-proxy/CDN rules. Remove the obsolete header or configure one authoritative value; prefer a deliberate Content-Security-Policy where appropriate.

## Discovery gaps

- Only one happy-path registration request/response was captured. Invalid live submissions were not sent; validation behavior remains unknown.
- The fake leads were cross-checked in the admin list and detail APIs using an authorized account; dashboard and profile reads also passed. The most recent one-record E2E created record id 22.
- OpenAPI's global bearer setting is inaccurate for the observed public registration and login requests.
- Error status codes/shapes, CAPTCHA, rate limiting, token lifetime semantics, and actual admin UI-to-API mapping need runtime discovery.