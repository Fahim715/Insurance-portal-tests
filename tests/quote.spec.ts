import { test, expect } from '@playwright/test';
import { QuotePage } from '../pages/QuotePage';
import { validUser, invalidUsers } from '../fixtures/testData';
import path from 'path';

const PORTAL_URL = `file://${path.resolve(__dirname, '../portal/index.html')}`;

test.describe('Quote Form — Validation', () => {

  test('@smoke page loads with correct title', async ({ page }) => {
    const quotePage = new QuotePage(page);
    await quotePage.goto(PORTAL_URL);
    const title = await quotePage.getPageTitle();
    expect(title).toContain('SafeGuard Insurance');
  });

  test('shows errors when form is submitted empty', async ({ page }) => {
    const quotePage = new QuotePage(page);
    await quotePage.goto(PORTAL_URL);
    await quotePage.clickGetQuote();

    const errors = await quotePage.getErrorMessages();
    expect(errors.length).toBeGreaterThanOrEqual(3);
    expect(errors).toContain('Full name is required.');
    expect(errors).toContain('Please enter a valid email.');
    expect(errors).toContain('Please select a coverage type.');
  });

  test('shows error for invalid email format', async ({ page }) => {
    const quotePage = new QuotePage(page);
    await quotePage.goto(PORTAL_URL);
    await quotePage.fillName(invalidUsers.badEmail.name);
    await quotePage.fillEmail(invalidUsers.badEmail.email);
    await quotePage.fillAge(invalidUsers.badEmail.age);
    await quotePage.selectCoverType(invalidUsers.badEmail.coverType);
    await quotePage.clickGetQuote();

    const errors = await quotePage.getErrorMessages();
    expect(errors).toContain('Please enter a valid email.');
  });

  test('shows error for age below 18', async ({ page }) => {
    const quotePage = new QuotePage(page);
    await quotePage.goto(PORTAL_URL);
    await quotePage.fillName(invalidUsers.underAge.name);
    await quotePage.fillEmail(invalidUsers.underAge.email);
    await quotePage.fillAge(invalidUsers.underAge.age);
    await quotePage.selectCoverType(invalidUsers.underAge.coverType);
    await quotePage.clickGetQuote();

    const errors = await quotePage.getErrorMessages();
    expect(errors).toContain('Age must be between 18 and 99.');
  });

  test('@smoke valid form submission navigates to plan selection', async ({ page }) => {
    const quotePage = new QuotePage(page);
    await quotePage.goto(PORTAL_URL);
    await quotePage.submitQuoteForm(validUser);

    const planVisible = await quotePage.isPolicySelectionVisible();
    expect(planVisible).toBe(true);
  });

  test('all three plan cards are shown after valid submission', async ({ page }) => {
    const quotePage = new QuotePage(page);
    await quotePage.goto(PORTAL_URL);
    await quotePage.submitQuoteForm(validUser);

    await expect(page.getByTestId('plan-basic')).toBeVisible();
    await expect(page.getByTestId('plan-standard')).toBeVisible();
    await expect(page.getByTestId('plan-premium')).toBeVisible();
  });

});
