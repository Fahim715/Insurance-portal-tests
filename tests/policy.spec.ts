import { expect, test } from '../fixtures/pageFixtures';
import { plans, validUser } from '../fixtures/testData';
import { PlanName, PolicyPage } from '../pages/PolicyPage';

test.describe('Plan Selection', () => {
  test('all three plan cards are displayed', async ({ page, quoteCompletedPolicyPage }) => {
    await expect(page.getByTestId('plan-basic')).toBeVisible();
    await expect(page.getByTestId('plan-standard')).toBeVisible();
    await expect(page.getByTestId('plan-premium')).toBeVisible();
  });

  test('each plan card shows a price', async ({ quoteCompletedPolicyPage }) => {
    const basicPrice = await quoteCompletedPolicyPage.getPlanPrice('basic');
    const standardPrice = await quoteCompletedPolicyPage.getPlanPrice('standard');
    const premiumPrice = await quoteCompletedPolicyPage.getPlanPrice('premium');

    expect(basicPrice).toContain('$49');
    expect(standardPrice).toContain('$89');
    expect(premiumPrice).toContain('$149');
  });

  test('selecting Basic highlights the Basic card', async ({ quoteCompletedPolicyPage }) => {
    await quoteCompletedPolicyPage.selectPlan('basic');
    const isHighlighted = await quoteCompletedPolicyPage.isPlanHighlighted('basic');
    expect(isHighlighted).toBe(true);
  });

  test('selecting Standard highlights the Standard card', async ({ quoteCompletedPolicyPage }) => {
    await quoteCompletedPolicyPage.selectPlan('standard');
    const isHighlighted = await quoteCompletedPolicyPage.isPlanHighlighted('standard');
    expect(isHighlighted).toBe(true);
  });

  test('selecting Premium highlights the Premium card', async ({ quoteCompletedPolicyPage }) => {
    await quoteCompletedPolicyPage.selectPlan('premium');
    const isHighlighted = await quoteCompletedPolicyPage.isPlanHighlighted('premium');
    expect(isHighlighted).toBe(true);
  });

  test('after selecting a plan the confirm screen appears', async ({ page, quoteCompletedPolicyPage }) => {
    await quoteCompletedPolicyPage.selectPlan('standard');
    await expect(page.getByTestId('btn-confirm')).toBeVisible();
  });
});

test.describe('Confirmation Summary', () => {
  async function selectPlanAndGetSummary(
    quoteCompletedPolicyPage: PolicyPage,
    plan: PlanName
  ) {
    await quoteCompletedPolicyPage.selectPlan(plan);
    return quoteCompletedPolicyPage.getConfirmationSummary();
  }

  test('summary shows the correct user name', async ({ quoteCompletedPolicyPage }) => {
    const summary = await selectPlanAndGetSummary(quoteCompletedPolicyPage, 'basic');
    expect(summary.name).toBe(validUser.name);
  });

  test('summary shows the correct user email', async ({ quoteCompletedPolicyPage }) => {
    const summary = await selectPlanAndGetSummary(quoteCompletedPolicyPage, 'basic');
    expect(summary.email).toBe(validUser.email);
  });

  test('summary shows the correct coverage type', async ({ quoteCompletedPolicyPage }) => {
    const summary = await selectPlanAndGetSummary(quoteCompletedPolicyPage, 'basic');
    expect(summary.coverage).toBe(validUser.coverType);
  });

  test('summary shows "Basic Plan" when Basic was selected', async ({ quoteCompletedPolicyPage }) => {
    const summary = await selectPlanAndGetSummary(quoteCompletedPolicyPage, 'basic');
    expect(summary.plan).toBe(plans.basic.name);
  });

  test('summary shows "Standard Plan" when Standard was selected', async ({ quoteCompletedPolicyPage }) => {
    const summary = await selectPlanAndGetSummary(quoteCompletedPolicyPage, 'standard');
    expect(summary.plan).toBe(plans.standard.name);
  });

  test('summary shows "Premium Plan" when Premium was selected', async ({ quoteCompletedPolicyPage }) => {
    const summary = await selectPlanAndGetSummary(quoteCompletedPolicyPage, 'premium');
    expect(summary.plan).toBe(plans.premium.name);
  });

  test('summary shows $49/month for Basic', async ({ quoteCompletedPolicyPage }) => {
    const summary = await selectPlanAndGetSummary(quoteCompletedPolicyPage, 'basic');
    expect(summary.price).toBe(plans.basic.price);
  });

  test('summary shows $89/month for Standard', async ({ quoteCompletedPolicyPage }) => {
    const summary = await selectPlanAndGetSummary(quoteCompletedPolicyPage, 'standard');
    expect(summary.price).toBe(plans.standard.price);
  });

  test('summary shows $149/month for Premium', async ({ quoteCompletedPolicyPage }) => {
    const summary = await selectPlanAndGetSummary(quoteCompletedPolicyPage, 'premium');
    expect(summary.price).toBe(plans.premium.price);
  });
});

test.describe('Purchase Flow — Happy Path', () => {
  async function completePurchase(quoteCompletedPolicyPage: PolicyPage, plan: PlanName) {
    await quoteCompletedPolicyPage.selectPlan(plan);
    await quoteCompletedPolicyPage.clickConfirm();
  }

  test('@smoke Basic → confirm → success message visible', async ({ quoteCompletedPolicyPage }) => {
    await completePurchase(quoteCompletedPolicyPage, 'basic');
    const isVisible = await quoteCompletedPolicyPage.isSuccessVisible();
    expect(isVisible).toBe(true);
  });

  test('@smoke Standard → confirm → success message visible', async ({ quoteCompletedPolicyPage }) => {
    await completePurchase(quoteCompletedPolicyPage, 'standard');
    const isVisible = await quoteCompletedPolicyPage.isSuccessVisible();
    expect(isVisible).toBe(true);
  });

  test('@smoke Premium → confirm → success message visible', async ({ quoteCompletedPolicyPage }) => {
    await completePurchase(quoteCompletedPolicyPage, 'premium');
    const isVisible = await quoteCompletedPolicyPage.isSuccessVisible();
    expect(isVisible).toBe(true);
  });

  test('@smoke success message contains the word "Policy Confirmed"', async ({ quoteCompletedPolicyPage }) => {
    await completePurchase(quoteCompletedPolicyPage, 'standard');
    const text = await quoteCompletedPolicyPage.getSuccessMessageText();
    expect(text).toContain('Policy Confirmed');
  });

  test('@smoke Start Over button reloads the form (Get Quote button visible again)', async ({ page, quoteCompletedPolicyPage }) => {
    await completePurchase(quoteCompletedPolicyPage, 'basic');
    await quoteCompletedPolicyPage.startOver();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.getByTestId('btn-get-quote')).toBeVisible();
  });
});
