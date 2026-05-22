import { test as base, expect } from '@playwright/test';
import { QuotePage } from '../pages/QuotePage';
import { PolicyPage } from '../pages/PolicyPage';
import { validUser } from './testData';

type PageFixtures = {
  quotePage: QuotePage;
  policyPage: PolicyPage;
  navigatedQuotePage: QuotePage;
  quoteCompletedPolicyPage: PolicyPage;
};

export const test = base.extend<PageFixtures>({
  quotePage: async ({ page }, use) => {
    await use(new QuotePage(page));
  },

  policyPage: async ({ page }, use) => {
    await use(new PolicyPage(page));
  },

  navigatedQuotePage: async ({ page }, use, testInfo) => {
    const baseUrl = testInfo.project.use.baseURL;
    if (!baseUrl) {
      throw new Error('baseURL is not configured in Playwright config.');
    }

    const quotePage = new QuotePage(page);
    await quotePage.goto(baseUrl);
    await use(quotePage);
  },

  quoteCompletedPolicyPage: async ({ page }, use, testInfo) => {
    const baseUrl = testInfo.project.use.baseURL;
    if (!baseUrl) {
      throw new Error('baseURL is not configured in Playwright config.');
    }

    const quotePage = new QuotePage(page);
    await quotePage.goto(baseUrl);
    await quotePage.submitQuoteForm(validUser);

    const policyPage = new PolicyPage(page);
    await use(policyPage);
  },
});

export { expect };
