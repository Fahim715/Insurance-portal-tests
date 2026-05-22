import { Page } from '@playwright/test';

export class NavigationPage {
  constructor(private page: Page) {}

  async hasNavLink(label: string): Promise<boolean> {
    const matches = await this.page.locator('nav a', { hasText: label }).count();
    return matches > 0;
  }

  async clickNavLink(label: string) {
    await this.page.locator('nav a', { hasText: label }).first().click();
  }

  async getActiveNavLink(): Promise<string> {
    const text = await this.page.locator('nav a.active').first().textContent();
    return text?.trim() ?? '';
  }
}
