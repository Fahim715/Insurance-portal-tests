# SafeGuard Insurance Portal — Playwright Test Suite

A Page Object Model (POM) test framework for a mock insurance portal UI, built with **TypeScript + Playwright**.

## Project Structure

```
insurance-portal-tests/
├── portal/
│   └── index.html          # Mock insurance portal UI (no server needed)
├── pages/
│   ├── BasePage.ts          # Shared helper methods for all pages
│   ├── QuotePage.ts         # Page object: quote form (step 1)
│   └── PolicyPage.ts        # Page object: plan selection & confirm (steps 2-3)
├── fixtures/
│   └── testData.ts          # Reusable test data (valid/invalid users)
├── tests/
│   ├── quote.spec.ts        # Form validation tests
│   └── policy.spec.ts       # Plan selection & purchase flow tests
├── playwright.config.ts     # Config: Chromium + Firefox, screenshots on fail
├── tsconfig.json
└── package.json
```

## Setup

```bash
npm install
npx playwright install
```

## Run Tests

```bash
# All tests (Chromium + Firefox)
npm test

# Smoke tests only
npm run test:smoke

# With browser visible
npm run test:headed

# View HTML report
npm run report
```

## Test Coverage

| Area | Tests |
|---|---|
| Page load | Title check |
| Form validation | Empty form, bad email, underage, overage |
| Happy path | Full quote → select → confirm → success |
| Plan selection | Basic, Standard, Premium |
| Summary accuracy | Name, plan name, price |
| Post-purchase | Start over resets form |

## Key Design Decisions

- **No server required** — tests run against a local `file://` HTML portal
- **POM pattern** — each step has its own page class; tests never touch selectors directly  
- **`data-testid` attributes** — stable selectors that survive CSS/layout changes
- **`@smoke` tags** — run only critical path tests in CI for speed
- **Two browsers** — Chromium + Firefox configured in `playwright.config.ts`
