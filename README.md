# SafeGuard Insurance Portal — Test Automation

> Production-grade end-to-end test suite for a mock insurance portal, built to showcase QA automation skills for fintech and insurtech products.

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js_18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
---

## Quick Start

```bash
npm install
npx playwright install
npm test
```

---

## Project Structure

```
insurance-portal-tests/
├── portal/             # Mock insurance portal UI (no server needed)
├── pages/              # Page Object Models (Base, Navigation, Quote, Policy)
├── fixtures/           # Playwright fixtures and centralized test data
├── utils/              # URL builder and random data helpers
├── tests/              # Test specs (navigation, quote, policy)
├── .github/workflows/  # CI pipeline
└── playwright.config.ts
```

---

## Test Coverage

| Area | What's Tested |
|---|---|
| Page load | Title, navigation, initial state |
| Field validation | Required fields, invalid email, boundary ages |
| Submission flow | Step transitions, plan visibility |
| Plan selection | Highlighting, pricing, confirm screen |
| Confirmation summary | Name, email, coverage, plan, price |
| Purchase flow | Success message and start-over reset |

---

## Running Tests

```bash
npm test                  # Full suite
npm run test:smoke        # Smoke tests only
npm run test:headed       # Headed mode
npm run test:chrome       # Chromium only
npm run test:firefox      # Firefox only
npm run test:mobile       # Mobile Chrome (Pixel 5)
npm run test:staging      # Against staging env
npm run test:ci           # CI-style (retries + reporters)
npm run report            # Open HTML report
```

### Environments

```bash
ENVIRONMENT=staging npx playwright test
```

Supported: `local` (default — uses `portal/index.html`) · `staging`

---

## Design Patterns

- **Page Object Model** — selectors and actions stay centralized
- **Fixtures** — clean, reusable test setup per suite
- **`data-testid` selectors** — resilient, UI-agnostic
- **CI/CD** — GitHub Actions runs on every push to `main` and on PRs
