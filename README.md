# Jono Consultancy API Automation

BDD-style API and browser tests built with Playwright and `playwright-bdd`. Gherkin features are under `features/`; JavaScript step definitions are under `steps/`. API routes and field constraints are based on the published OpenAPI document and observed traffic. See [api-inventory.md](api-inventory.md) for the contract and known discovery gaps.

## Prerequisites

- Node.js 20 or newer and npm.
- Chromium for browser UI tests: `npx playwright install chromium` (on Linux CI, use `npx playwright install --with-deps chromium`).
- Java 17 or newer only when generating or opening Allure reports.
- Docker on a Jenkins agent when using the included `Jenkinsfile`.

## Local Setup

```sh
npm ci
npx playwright install chromium
cp .env.example .env
```

Edit `.env` only for the endpoints and authorized credentials needed for your run. Keep `.env` out of Git; it is ignored. `ADMIN_USER` and `ADMIN_PASS` must be valid, authorized service credentials. Protected admin API and portal scenarios skip when either is empty. Do not use fabricated values against the live login API.

| Variable | Purpose | Default |
| --- | --- | --- |
| `PUBLIC_BASE_URL` | Public registration API base URL | `https://api.jonoconsultancy.com` |
| `PUBLIC_SITE_URL` | Public website base URL for UI tests | `https://jonoconsultancy.com` |
| `ADMIN_BASE_URL` | Admin API base URL | `https://api.jonoconsultancy.com` |
| `ADMIN_PORTAL_URL` | Admin portal URL | `https://admin.jonoconsultancy.com` |
| `ADMIN_USER` | Authorized admin email/username | Empty; authenticated scenarios skip |
| `ADMIN_PASS` | Authorized admin password | Empty; authenticated scenarios skip |
| `PUBLIC_API_TOKEN` | Optional public API bearer token | Empty |
| `ALLOW_LIVE_REGISTRATION` | Allow test to create/update a live student record | `false` unless explicitly set to `true` |
| `PLAYWRIGHT_HTML_OUTPUT_DIR` | Playwright HTML report output directory | `reports/html` |
| `ALLURE_RESULTS_DIR` | Allure raw result output directory | `reports/allure-results` |

Never commit credentials or recovery tokens, and do not include secrets in screenshots, reports, or logs. Rotate any credentials accidentally shared in plain text. Confirm API token requirements with the service owner before live registration runs.

### Security Probes

The default `@Security` scenarios use deterministic local mocks; they do not establish that the deployed service enforces those controls. In particular, the JWT and recovery-key fixtures do not prove cryptographic expiry validation, and the mock password policy is not confirmed as the service policy. Read-only probes require `ALLOW_READONLY_SECURITY_PROBES=true` and an explicit `SECURITY_TEST_BASE_URL`. Production probes additionally require `ALLOW_PRODUCTION_SECURITY_PROBES=true` and are restricted to `https://api.jonoconsultancy.com`; redirects are not followed. Unauthenticated/malformed-token probes check status only and do not read response bodies. The own-profile/dashboard probe performs a normal login `POST` with configured `ADMIN_USER` and `ADMIN_PASS`, then reads only that account's profile and aggregate counters. Invalid lead-ID probes are deliberately excluded from the production-safe tag. These tests do not validate login throttling, password recovery against a real account, lower-privilege roles, or cross-user BOLA/IDOR.

To run only the selected production-safe probes, configure authorized admin credentials in `.env` for the profile/dashboard probe, then run:

```sh
npm run test:production-safe
```

This command explicitly enables the production-safe probe gates and targets `https://api.jonoconsultancy.com`. Use it only when authorized to test production. The profile/dashboard scenario skips if `ADMIN_USER` or `ADMIN_PASS` is missing. Do not enable `@IdProbe` or live registration against production.

The repeated-login mock scenario compares known-account and unknown-account failure responses, but does not implement or verify rate limiting. No application rate-limit defect can be concluded from that mock. Before reporting a defect, run the opt-in probes against the authorized test environment and capture sanitized request/response evidence without credentials or tokens.

Production-safe security probes also make one login attempt with a synthetic `.invalid` email, checking rejection and credential/internal-error leakage, and inspect the protected API's security headers with `HEAD`. This is not a rate-limit test and does not compare known and unknown real accounts. The current production header inconsistency is recorded in [api-inventory.md](api-inventory.md); the probe intentionally fails until the conflicting values are resolved.

## Run Tests

| Command | What it runs |
| --- | --- |
| `npm test` | All generated scenarios |
| `npm run bddgen` | Generate Playwright tests from the Gherkin features |
| `npm run test:sanity` | Scenarios tagged `@Sanity` |
| `npm run test:smoke` | Scenarios tagged `@Smoke` |
| `npm run test:smoke:allure` | Smoke suite plus separate Playwright and Allure reports |
| `npm run test:regression` | Scenarios tagged `@Regression` |
| `npm run test:regression:allure` | Regression suite plus separate Playwright and Allure reports |
| `npm run test:security` | Scenarios tagged `@Security` (deterministic local mocks) |
| `npm run test:security:allure` | Security suite plus separate reports |
| `npm run test:e2e` | Scenarios tagged `@E2E` |
| `npm run test:api` | API project only |
| `npm run test:ui` | Chromium UI project only |

The Allure scripts clear and regenerate their suite-specific output directories. Open reports with `npm run report:smoke`, `npm run report:regression` (or `npm run report`), and `npm run allure:open`. Allure HTML generation requires Java 17. Raw Allure results are in `reports/allure-results/`; HTML reports are in `reports/allure-html/`.

For a quick local CI-style check before pushing, run `npm ci`, `npm run test:sanity`, `npm run test:smoke:allure`, then `npm run test:regression:allure`. The smoke and regression scripts may require authorized admin credentials for their protected cases. The live registration flow is opt-in, creates or updates an external student record, and must only be run against an authorized test environment. Do not enable `ALLOW_LIVE_REGISTRATION=true` for routine checks. The security feature scenarios use deterministic local mocks; they do not validate the live service's security controls.

## VS Code Step Navigation

Install the recommended **Cucumber** extension (`cucumberopen.cucumber-official`) and open this repository as the workspace root. Workspace settings map `features/**/*.feature` to `steps/**/*.js` and `support/hooks.js` through the extension's `cucumber.features` and `cucumber.glue` settings. Reload the VS Code window after installing or changing the extension settings. Definitions are Playwright-BDD `Given`, `When`, and `Then` functions imported from `support/hooks.js`. Run `npm run bddgen` to confirm Playwright-BDD can generate the feature scenarios; editor navigation is provided by the extension settings.

Use **Tasks: Run Task** from the Command Palette for **Jono: Sanity**, **Jono: Smoke**, or **Jono: Regression**. The smoke and regression tasks also create Allure reports.

## Screenshots And Failure Artifacts

Browser tests are configured to capture a screenshot and retain a Playwright trace when a test fails. Find local artifacts under `test-results/`; the Playwright HTML report also links available failure attachments. The UI report output defaults to `reports/html`, or to the directory selected by `PLAYWRIGHT_HTML_OUTPUT_DIR`. CI archives `test-results/` with the HTML and Allure reports. Generated artifacts are ignored by Git; inspect them locally or download them from the CI run rather than committing them.

## CI/CD

### GitHub Actions

`.github/workflows/api-tests.yml` runs independent smoke and regression jobs on pushes and pull requests targeting `main`, and can also be started with **Actions > API and UI Tests > Run workflow**. Each job uses Node 20, installs Chromium and Java 17, runs `npm ci`, and uploads Playwright/Allure output and `test-results/` as artifacts retained for 14 days.

To enable authenticated admin tests, add repository or environment secrets named `ADMIN_USER` and `ADMIN_PASS`. Missing credentials cause protected scenarios to skip; secret values are not printed. Optional repository variables for non-default authorized test environments are `PUBLIC_BASE_URL`, `PUBLIC_SITE_URL`, `ADMIN_BASE_URL`, and `ADMIN_PORTAL_URL`.

Routine CI jobs force `ALLOW_LIVE_REGISTRATION=false`. The manual workflow has a `run_live_registration` input, defaulting to false; enabling it creates one synthetic registration and verifies it through the admin API. Use only with authorization and working admin secrets.

After the repository is pushed to GitHub and Actions are enabled, pushing to `main` or opening/updating a pull request targeting `main` starts the routine jobs. Review the Actions run and download the uploaded report artifacts to inspect results and screenshots/traces.

### Jenkins

The root `Jenkinsfile` defines a Docker-based declarative pipeline using `mcr.microsoft.com/playwright:v1.59.0-noble`. The Jenkins agent must support Docker and have network access to the configured test environment. The pipeline checks out the repository, installs Java 17 and npm dependencies, runs smoke and regression stages, and archives Playwright HTML, Allure results/reports, and test results even when a stage fails.

#### Local Jenkins

Docker Desktop must be installed and running. From the repository root, start the local controller with:

```sh
DOCKER_GID="$(stat -f '%g' /var/run/docker.sock)" docker compose -f compose.jenkins.yaml up -d --build
```

Open `http://localhost:8080`, complete the initial Jenkins setup, then create a **Pipeline** item configured as **Pipeline script from SCM**. Use the repository URL, branch `main`, and script path `Jenkinsfile`. Add the `jono-admin-credentials` username/password credential with an authorized test account before running the pipeline. The controller's initial unlock password is available inside the container with `docker exec jenkins-local cat /var/jenkins_home/secrets/initialAdminPassword`.

This local controller is bound to loopback and mounts the host Docker socket so Docker Pipeline can launch test agents. Access to that socket can control the host Docker daemon; do not expose this controller publicly or reuse this configuration for hosting. Stop it with `docker compose -f compose.jenkins.yaml down`; Jenkins data remains in the `jenkins_home` volume. Remove that volume only when you intend to delete the local Jenkins configuration and job history.

The checked-in `Jenkinsfile` currently targets production URLs. Do not start a build until the target environment and test account are authorized; the smoke and regression stages run by default, and enabling `RUN_LIVE_REGISTRATION` creates an external record.

1. Add a Jenkins **Username with password** credential with ID `jono-admin-credentials`. Use an authorized test account; the username maps to `ADMIN_USER` and the password maps to `ADMIN_PASS`.
2. Create a Pipeline or Multibranch Pipeline job pointing to this repository and use the repository's `Jenkinsfile`.
3. Run the job. Smoke and regression run by default, with live registration disabled.
4. To run the separate live registration E2E, start a build with parameter `RUN_LIVE_REGISTRATION` enabled. This creates one external synthetic lead; use only in an authorized test environment.

For push-triggered Jenkins builds, configure the job's GitHub webhook or SCM polling in Jenkins. Triggering and webhook setup depend on the Jenkins installation and are not configured in this repository.

### Running The CI Commands Locally

From the repository root, use the same commands as the CI stages:

```sh
npm ci
npx playwright install chromium
npm run test:smoke:allure
npm run test:regression:allure
```

Set local environment variables or `.env` values for authorized credentials and non-default endpoints before running. Jenkins itself needs Docker and Java 17; GitHub Actions provisions its own CI environment. Neither CI pipeline submits a live registration unless its explicit opt-in is enabled.

## Project Layout

- `features/`: Gherkin registration, admin, security, UI, and end-to-end scenarios.
- `steps/`: scenario definitions; shared Playwright-BDD fixtures and keyword exports are in `support/hooks.js`.
- `clients/`: API clients for registration and admin authentication/leads.
- `models/`, `schemas/`: request mappings and response/request contracts.
- `utils/`: API client base, auth state, test data, and schema validation helpers.
- `config/`, `fixtures/`: URL/token accessors and static test payloads.
- `.github/workflows/`, `Jenkinsfile`: GitHub Actions and Jenkins pipelines.
- `reports/`, `test-results/`: generated reports and failure artifacts (not committed).

## Updating API Coverage

Review the published OpenAPI document at `https://api.jonoconsultancy.com/v3/api-docs` and, in an authorized browser session, capture public form/admin UI network requests. Update `api-inventory.md` from observed traffic, then change only the affected client, schema, and feature mappings. Do not assume undocumented validation errors, authentication behavior, or field transformations. See the inventory's discovery gaps before adding live negative tests.