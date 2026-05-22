import { promises as fs } from 'fs';
import path from 'path';
import { Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async waitForVisible(testId: string) {
    await this.page.getByTestId(testId).waitFor({ state: 'visible' });
  }

  async waitForURL(pattern: string | RegExp) {
    await this.page.waitForURL(pattern);
  }

  async takeScreenshot(name: string) {
    const screenshotsDir = path.resolve(process.cwd(), 'test-results', 'screenshots');
    await fs.mkdir(screenshotsDir, { recursive: true });
    await this.page.screenshot({
      path: path.join(screenshotsDir, `${name}.png`),
      fullPage: true,
    });
  }

  async isElementVisible(testId: string): Promise<boolean> {
    return this.page.getByTestId(testId).isVisible();
  }

  async getTextOf(testId: string): Promise<string> {
    const text = await this.page.getByTestId(testId).textContent();
    return text?.trim() ?? '';
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  async getErrorMessages(): Promise<string[]> {
    const errors = await this.page.locator('.error-msg.visible').allTextContents();
    return errors.map((e) => e.trim()).filter(Boolean);
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}
