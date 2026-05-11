import { test, expect } from '@playwright/test';
import { QuotePage } from '../pages/QuotePage';
import { PolicyPage } from '../pages/PolicyPage';
import { validUser } from '../fixtures/testData';
import path from 'path';

const PORTAL_URL = `file://${path.resolve(__dirname, '../portal/index.html')}`;

// Helper: go through step 1 so tests can start from plan selection
async function reachPlanSelection(page: any) {
  const quotePage = new QuotePage(page);
  await quotePage.goto(PORTAL_URL);
  await quotePage.submitQuoteForm(validUser);
}

test.describe('Policy Selection & Confirmation', () => {

  test('@smoke can select the Basic plan', async ({ page }) => {
    await reachPlanSelection(page);
    const policyPage = new PolicyPage(page);
    await policyPage.selectPlan('basic');
    await expect(page.getByTestId('btn-confirm')).toBeVisible();
  });

  test('@smoke can select the Standard plan', async ({ page }) => {
    await reachPlanSelection(page);
    const policyPage = new PolicyPage(page);
    await policyPage.selectPlan('standard');
    await expect(page.getByTestId('btn-confirm')).toBeVisible();
  });

  test('confirm summary shows correct user name', async ({ page }) => {
    await reachPlanSelection(page);
    const policyPage = new PolicyPage(page);
    await policyPage.selectPlan('standard');

    const summaryName = await policyPage.getSummaryField('Name');
    expect(summaryName.trim()).toBe(validUser.name);
  });

  test('confirm summary shows correct plan name', async ({ page }) => {
    await reachPlanSelection(page);
    const policyPage = new PolicyPage(page);
    await policyPage.selectPlan('premium');

    const summaryPlan = await policyPage.getSummaryField('Plan');
    expect(summaryPlan).toContain('Premium');
  });

  test('confirm summary shows correct monthly price for Basic', async ({ page }) => {
    await reachPlanSelection(page);
    const policyPage = new PolicyPage(page);
    await policyPage.selectPlan('basic');

    const price = await policyPage.getSummaryField('Monthly Cost');
    expect(price).toContain('$49');
  });

  test('@smoke full happy path — quote → select → confirm → success', async ({ page }) => {
    await reachPlanSelection(page);
    const policyPage = new PolicyPage(page);

    await policyPage.selectPlan('standard');
    await policyPage.clickConfirm();

    const success = await policyPage.isSuccessVisible();
    expect(success).toBe(true);
  });

  test('start over after purchase reloads the form', async ({ page }) => {
    await reachPlanSelection(page);
    const policyPage = new PolicyPage(page);

    await policyPage.selectPlan('basic');
    await policyPage.clickConfirm();
    await policyPage.startOver();

    // After reload, the quote form should be visible again
    await expect(page.getByTestId('btn-get-quote')).toBeVisible();
  });

});
