import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async waitForVisible(testId: string) {
    await this.page.getByTestId(testId).waitFor({ state: 'visible' });
  }

  async getErrorMessages(): Promise<string[]> {
    const errors = await this.page.locator('.error-msg.visible').allTextContents();
    return errors.map((e) => e.trim()).filter(Boolean);
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}
