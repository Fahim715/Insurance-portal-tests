import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class QuotePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async fillName(name: string) {
    await this.page.getByTestId('input-name').fill(name);
  }

  async fillEmail(email: string) {
    await this.page.getByTestId('input-email').fill(email);
  }

  async fillAge(age: string) {
    await this.page.getByTestId('input-age').fill(age);
  }

  async selectCoverType(value: string) {
    await this.page.getByTestId('select-cover').selectOption(value);
  }

  async clickGetQuote() {
    await this.page.getByTestId('btn-get-quote').click();
  }

  // Shortcut: fill the whole form and submit
  async submitQuoteForm(data: {
    name: string;
    email: string;
    age: string;
    coverType: string;
  }) {
    await this.fillName(data.name);
    await this.fillEmail(data.email);
    await this.fillAge(data.age);
    await this.selectCoverType(data.coverType);
    await this.clickGetQuote();
  }

  async isPolicySelectionVisible(): Promise<boolean> {
    return this.page.getByTestId('plan-basic').isVisible();
  }
}
