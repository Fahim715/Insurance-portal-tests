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

  async getPlanPrice(plan: PlanName): Promise<string> {
    const text = await this.page.getByTestId(`plan-${plan}`).locator('.policy-price').textContent();
    return text?.trim() ?? '';
  }

  async isPlanHighlighted(plan: PlanName): Promise<boolean> {
    const className = await this.page.getByTestId(`plan-${plan}`).getAttribute('class');
    return className?.split(' ').includes('selected') ?? false;
  }

  async clickConfirm() {
    await this.page.getByTestId('btn-confirm').click();
  }

  async isSuccessVisible(): Promise<boolean> {
    return this.page.getByTestId('success-message').isVisible();
  }

  async getConfirmationSummary(): Promise<{
    name: string;
    email: string;
    coverage: string;
    plan: string;
    price: string;
  }> {
    const name = (await this.page.locator('#summaryName').textContent())?.trim() ?? '';
    const email = (await this.page.locator('#summaryEmail').textContent())?.trim() ?? '';
    const coverage = (await this.page.locator('#summaryCover').textContent())?.trim() ?? '';
    const plan = (await this.page.locator('#summaryPlan').textContent())?.trim() ?? '';
    const price = (await this.page.locator('#summaryPrice').textContent())?.trim() ?? '';

    return { name, email, coverage, plan, price };
  }

  async getSuccessMessageText(): Promise<string> {
    const text = await this.page.locator('#successSection h2').textContent();
    return text?.trim() ?? '';
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
