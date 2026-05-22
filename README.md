# SafeGuard Insurance Portal Test Automation

Production-grade Playwright + TypeScript test suite for a mock insurance portal, built to showcase QA automation skills for fintech and insurtech products.

## Tech Stack

- Playwright
- TypeScript
- GitHub Actions

## Prerequisites

- Node.js 18+

## Setup

```bash
npm install
npx playwright install
```

## Project Structure

```
insurance-portal-tests/
├── portal/
│   └── index.html                  # Mock insurance portal UI (no server required)
├── pages/
│   ├── BasePage.ts                  # Shared page object helpers
│   ├── NavigationPage.ts            # Page object for top navigation
│   ├── QuotePage.ts                 # Quote form (step 1)
│   └── PolicyPage.ts                # Plan selection and confirmation (steps 2-3)
├── fixtures/
│   ├── pageFixtures.ts              # Playwright test fixtures
│   └── testData.ts                  # Centralized test data and constants
├── utils/
│   └── helpers.ts                   # URL builder and random data utilities
├── tests/
│   ├── navigation.spec.ts           # Navigation and header checks
│   ├── quote.spec.ts                # Quote form validation and submission
│   └── policy.spec.ts               # Plan selection, summary, and purchase flow
├── .github/
│   └── workflows/
│       └── playwright.yml           # CI pipeline for Playwright tests
├── playwright.config.ts             # Multi-environment Playwright configuration
├── tsconfig.json                    # TypeScript settings
└── package.json                     # Scripts and dev dependencies
```

## Running Tests

```bash
# Full test suite (all projects)
npm test

# Smoke tests only
npm run test:smoke

# Headed mode
npm run test:headed

# Chromium only
npm run test:chrome

# Firefox only
npm run test:firefox

# Mobile Chrome (Pixel 5)
npm run test:mobile

# Run against staging
npm run test:staging

# CI-style run (retries and reporters)
npm run test:ci

# Open Playwright HTML report
npm run report
```

## Environment Config

The environment is selected using the `ENVIRONMENT` variable. Supported values:

- `local` (default): runs against the local `portal/index.html` file
- `staging`: runs against `https://staging.safeguard-insurance.example.com`

Example:

```bash
ENVIRONMENT=staging npx playwright test
```

## Test Coverage

| Area | Coverage |
| --- | --- |
| Page load | Title, navigation, and initial state checks |
| Field validation | Required fields, invalid email, boundary ages, coverage required |
| Submission flow | Step transitions and plan visibility |
| Plan selection | Highlighting, pricing, and confirm screen transition |
| Confirmation summary | Name, email, coverage, plan, and price validation |
| Purchase flow | Confirm success message and start-over reset |

## Design Patterns

- Page Object Model (POM) keeps selectors and actions centralized
- Fixtures provide clean, reusable test setup for each suite
- `data-testid` attributes ensure resilient, UI-agnostic selectors

## CI/CD

GitHub Actions runs Playwright tests on every push to `main` and on pull requests. The workflow installs dependencies, installs Playwright browsers, executes tests with CI settings, and uploads Playwright artifacts on failure.
