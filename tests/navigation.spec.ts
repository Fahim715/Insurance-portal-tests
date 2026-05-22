import { expect, test } from '../fixtures/pageFixtures';
import { NavigationPage } from '../pages/NavigationPage';

test.describe('Site Navigation', () => {
  test('portal loads and shows the header with "SafeGuard Insurance"', async ({ page, navigatedQuotePage }) => {
    await navigatedQuotePage.waitForNetworkIdle();
    const headerText = await page.locator('header h1').textContent();
    expect(headerText ?? '').toContain('SafeGuard Insurance');
  });

  test('nav has "Get a Quote" link', async ({ page, navigatedQuotePage }) => {
    await navigatedQuotePage.waitForNetworkIdle();
    const nav = new NavigationPage(page);
    const hasLink = await nav.hasNavLink('Get a Quote');
    expect(hasLink).toBe(true);
  });

  test('nav has "My Policies" link', async ({ page, navigatedQuotePage }) => {
    await navigatedQuotePage.waitForNetworkIdle();
    const nav = new NavigationPage(page);
    const hasLink = await nav.hasNavLink('My Policies');
    expect(hasLink).toBe(true);
  });

  test('nav has "Contact" link', async ({ page, navigatedQuotePage }) => {
    await navigatedQuotePage.waitForNetworkIdle();
    const nav = new NavigationPage(page);
    const hasLink = await nav.hasNavLink('Contact');
    expect(hasLink).toBe(true);
  });

  test('"Get a Quote" link is the active nav item on load', async ({ page, navigatedQuotePage }) => {
    await navigatedQuotePage.waitForNetworkIdle();
    const nav = new NavigationPage(page);
    const activeLink = await nav.getActiveNavLink();
    expect(activeLink).toBe('Get a Quote');
  });
});
