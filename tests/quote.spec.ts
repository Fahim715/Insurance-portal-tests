import { expect, test } from '../fixtures/pageFixtures';
import { errorMessages, invalidUsers, validUser } from '../fixtures/testData';

test.describe('Quote Form — Page Load', () => {
  test('page has correct browser title', async ({ navigatedQuotePage }) => {
    const title = await navigatedQuotePage.getPageTitle();
    expect(title).toContain('SafeGuard Insurance');
  });

  test('all four form fields are visible on load', async ({ navigatedQuotePage }) => {
    expect(await navigatedQuotePage.isElementVisible('input-name')).toBe(true);
    expect(await navigatedQuotePage.isElementVisible('input-email')).toBe(true);
    expect(await navigatedQuotePage.isElementVisible('input-age')).toBe(true);
    expect(await navigatedQuotePage.isElementVisible('select-cover')).toBe(true);
  });

  test('Get Quote button is visible and enabled', async ({ navigatedQuotePage }) => {
    expect(await navigatedQuotePage.isElementVisible('btn-get-quote')).toBe(true);
    expect(await navigatedQuotePage.isGetQuoteButtonEnabled()).toBe(true);
  });

  test('step 1 indicator is active on load', async ({ navigatedQuotePage }) => {
    const activeStep = await navigatedQuotePage.getActivePlanStep();
    expect(activeStep).toBe('1. Your Details');
  });
});

test.describe('Quote Form — Field Validation', () => {
  test('submitting empty form shows 4 error messages', async ({ navigatedQuotePage }) => {
    await navigatedQuotePage.clickGetQuote();
    const errors = await navigatedQuotePage.getAllVisibleErrorMessages();

    expect(errors).toHaveLength(4);
    expect(errors).toContain(errorMessages.nameRequired);
    expect(errors).toContain(errorMessages.emailInvalid);
    expect(errors).toContain(errorMessages.ageInvalid);
    expect(errors).toContain(errorMessages.coverRequired);
  });

  test('name field error disappears after valid input is entered', async ({ navigatedQuotePage }) => {
    await navigatedQuotePage.clickGetQuote();
    let errors = await navigatedQuotePage.getAllVisibleErrorMessages();
    expect(errors).toContain(errorMessages.nameRequired);

    await navigatedQuotePage.clearAndFillName(validUser.name);
    await navigatedQuotePage.clickGetQuote();

    errors = await navigatedQuotePage.getAllVisibleErrorMessages();
    expect(errors).not.toContain(errorMessages.nameRequired);
  });

  test('invalid email shows correct error message', async ({ navigatedQuotePage }) => {
    await navigatedQuotePage.clearAndFillName(invalidUsers.badEmail.name);
    await navigatedQuotePage.clearAndFillEmail(invalidUsers.badEmail.email);
    await navigatedQuotePage.clearAndFillAge(invalidUsers.badEmail.age);
    await navigatedQuotePage.selectCoverType(invalidUsers.badEmail.coverType);
    await navigatedQuotePage.clickGetQuote();

    const errors = await navigatedQuotePage.getAllVisibleErrorMessages();
    expect(errors).toContain(errorMessages.emailInvalid);
  });

  test('email error disappears after valid email entered', async ({ navigatedQuotePage }) => {
    await navigatedQuotePage.clearAndFillName(invalidUsers.badEmail.name);
    await navigatedQuotePage.clearAndFillEmail(invalidUsers.badEmail.email);
    await navigatedQuotePage.clearAndFillAge(invalidUsers.badEmail.age);
    await navigatedQuotePage.selectCoverType(invalidUsers.badEmail.coverType);
    await navigatedQuotePage.clickGetQuote();

    let errors = await navigatedQuotePage.getAllVisibleErrorMessages();
    expect(errors).toContain(errorMessages.emailInvalid);

    await navigatedQuotePage.clearAndFillEmail(validUser.email);
    await navigatedQuotePage.clickGetQuote();

    errors = await navigatedQuotePage.getAllVisibleErrorMessages();
    expect(errors).not.toContain(errorMessages.emailInvalid);
  });

  test('age below 18 shows age error', async ({ navigatedQuotePage }) => {
    await navigatedQuotePage.clearAndFillName(invalidUsers.underAge.name);
    await navigatedQuotePage.clearAndFillEmail(invalidUsers.underAge.email);
    await navigatedQuotePage.clearAndFillAge(invalidUsers.underAge.age);
    await navigatedQuotePage.selectCoverType(invalidUsers.underAge.coverType);
    await navigatedQuotePage.clickGetQuote();

    const errors = await navigatedQuotePage.getAllVisibleErrorMessages();
    expect(errors).toContain(errorMessages.ageInvalid);
  });

  test('age above 99 shows age error', async ({ navigatedQuotePage }) => {
    await navigatedQuotePage.clearAndFillName(invalidUsers.overAge.name);
    await navigatedQuotePage.clearAndFillEmail(invalidUsers.overAge.email);
    await navigatedQuotePage.clearAndFillAge(invalidUsers.overAge.age);
    await navigatedQuotePage.selectCoverType(invalidUsers.overAge.coverType);
    await navigatedQuotePage.clickGetQuote();

    const errors = await navigatedQuotePage.getAllVisibleErrorMessages();
    expect(errors).toContain(errorMessages.ageInvalid);
  });

  test('age of exactly 18 is accepted (boundary test)', async ({ navigatedQuotePage }) => {
    await navigatedQuotePage.submitQuoteForm({
      ...validUser,
      age: '18',
    });

    const step = await navigatedQuotePage.getActivePlanStep();
    expect(step).toBe('2. Choose Plan');
  });

  test('age of exactly 99 is accepted (boundary test)', async ({ navigatedQuotePage }) => {
    await navigatedQuotePage.submitQuoteForm({
      ...validUser,
      age: '99',
    });

    const step = await navigatedQuotePage.getActivePlanStep();
    expect(step).toBe('2. Choose Plan');
  });

  test('no coverage selected shows coverage error', async ({ navigatedQuotePage }) => {
    await navigatedQuotePage.clearAndFillName(validUser.name);
    await navigatedQuotePage.clearAndFillEmail(validUser.email);
    await navigatedQuotePage.clearAndFillAge(validUser.age);
    await navigatedQuotePage.clickGetQuote();

    const errors = await navigatedQuotePage.getAllVisibleErrorMessages();
    expect(errors).toContain(errorMessages.coverRequired);
  });

  test('all three coverage options (health, life, auto) are selectable', async ({ page, navigatedQuotePage }) => {
    const coverSelect = page.getByTestId('select-cover');
    const coverOptions = ['health', 'life', 'auto'];

    for (const option of coverOptions) {
      await navigatedQuotePage.selectCoverType(option);
      await expect(coverSelect).toHaveValue(option);
    }
  });
});

test.describe('Quote Form — Successful Submission', () => {
  test('valid form navigates to plan selection (step 2)', async ({ navigatedQuotePage }) => {
    await navigatedQuotePage.submitQuoteForm(validUser);
    const step = await navigatedQuotePage.getActivePlanStep();
    expect(step).toBe('2. Choose Plan');
  });

  test('step 2 indicator becomes active after submit', async ({ navigatedQuotePage, page }) => {
    await navigatedQuotePage.submitQuoteForm(validUser);
    await expect(page.locator('#step2')).toHaveClass(/active/);
  });

  test('step 1 indicator shows as done after submit', async ({ navigatedQuotePage, page }) => {
    await navigatedQuotePage.submitQuoteForm(validUser);
    await expect(page.locator('#step1')).toHaveClass(/done/);
  });

  test('all three plan cards (basic, standard, premium) are visible', async ({ navigatedQuotePage, page }) => {
    await navigatedQuotePage.submitQuoteForm(validUser);
    await expect(page.getByTestId('plan-basic')).toBeVisible();
    await expect(page.getByTestId('plan-standard')).toBeVisible();
    await expect(page.getByTestId('plan-premium')).toBeVisible();
  });
});
