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

  async clearAndFillName(name: string) {
    await this.page.getByTestId('input-name').fill('');
    await this.page.getByTestId('input-name').fill(name);
  }

  async clearAndFillEmail(email: string) {
    await this.page.getByTestId('input-email').fill('');
    await this.page.getByTestId('input-email').fill(email);
  }

  async clearAndFillAge(age: string) {
    await this.page.getByTestId('input-age').fill('');
    await this.page.getByTestId('input-age').fill(age);
  }

  async getFieldErrorText(field: 'name' | 'email' | 'age' | 'cover'): Promise<string> {
    const errorSelectors: Record<'name' | 'email' | 'age' | 'cover', string> = {
      name: '#nameError',
      email: '#emailError',
      age: '#ageError',
      cover: '#coverError',
    };

    const text = await this.page.locator(errorSelectors[field]).textContent();
    return text?.trim() ?? '';
  }

  async isGetQuoteButtonEnabled(): Promise<boolean> {
    return this.page.getByTestId('btn-get-quote').isEnabled();
  }

  async getAllVisibleErrorMessages(): Promise<string[]> {
    return this.getErrorMessages();
  }

  async getActivePlanStep(): Promise<string> {
    const text = await this.page.locator('.step.active').first().textContent();
    return text?.trim() ?? '';
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
