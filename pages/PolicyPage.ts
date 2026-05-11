import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export type PlanName = 'basic' | 'standard' | 'premium';

export class PolicyPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async selectPlan(plan: PlanName) {
    await this.page.getByTestId(`btn-select-${plan}`).click();
  }

  async clickConfirm() {
    await this.page.getByTestId('btn-confirm').click();
  }

  async isSuccessVisible(): Promise<boolean> {
    return this.page.getByTestId('success-message').isVisible();
  }

  async getSummaryField(field: 'Name' | 'Email' | 'Coverage' | 'Plan' | 'Monthly Cost'): Promise<string> {
    // Summary table: find the row whose first cell matches the label
    const rows = this.page.locator('table tr');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const label = await rows.nth(i).locator('td').first().textContent();
      if (label?.trim() === field) {
        return (await rows.nth(i).locator('td').last().textContent()) ?? '';
      }
    }
    return '';
  }

  async startOver() {
    await this.page.getByTestId('btn-start-over').click();
  }
}
