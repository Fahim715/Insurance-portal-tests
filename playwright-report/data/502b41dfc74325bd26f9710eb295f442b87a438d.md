# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: policy.spec.ts >> Policy Selection & Confirmation >> confirm summary shows correct monthly price for Basic
- Location: tests/policy.spec.ts:50:7

# Error details

```
Error: locator.click: Test ended.
Call log:
  - waiting for getByTestId('btn-select-basic')
    - locator resolved to <button class="btn-outline" data-testid="btn-select-basic" onclick="selectPlan('Basic', 49)">Select</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action

```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | import { BasePage } from './BasePage';
  3  | 
  4  | export type PlanName = 'basic' | 'standard' | 'premium';
  5  | 
  6  | export class PolicyPage extends BasePage {
  7  |   constructor(page: Page) {
  8  |     super(page);
  9  |   }
  10 | 
  11 |   async selectPlan(plan: PlanName) {
> 12 |     await this.page.getByTestId(`btn-select-${plan}`).click();
     |                                                       ^ Error: locator.click: Test ended.
  13 |   }
  14 | 
  15 |   async getPlanPrice(plan: PlanName): Promise<string> {
  16 |     const text = await this.page.getByTestId(`plan-${plan}`).locator('.policy-price').textContent();
  17 |     return text?.trim() ?? '';
  18 |   }
  19 | 
  20 |   async isPlanHighlighted(plan: PlanName): Promise<boolean> {
  21 |     const className = await this.page.getByTestId(`plan-${plan}`).getAttribute('class');
  22 |     return className?.split(' ').includes('selected') ?? false;
  23 |   }
  24 | 
  25 |   async clickConfirm() {
  26 |     await this.page.getByTestId('btn-confirm').click();
  27 |   }
  28 | 
  29 |   async isSuccessVisible(): Promise<boolean> {
  30 |     return this.page.getByTestId('success-message').isVisible();
  31 |   }
  32 | 
  33 |   async getConfirmationSummary(): Promise<{
  34 |     name: string;
  35 |     email: string;
  36 |     coverage: string;
  37 |     plan: string;
  38 |     price: string;
  39 |   }> {
  40 |     const name = (await this.page.locator('#summaryName').textContent())?.trim() ?? '';
  41 |     const email = (await this.page.locator('#summaryEmail').textContent())?.trim() ?? '';
  42 |     const coverage = (await this.page.locator('#summaryCover').textContent())?.trim() ?? '';
  43 |     const plan = (await this.page.locator('#summaryPlan').textContent())?.trim() ?? '';
  44 |     const price = (await this.page.locator('#summaryPrice').textContent())?.trim() ?? '';
  45 | 
  46 |     return { name, email, coverage, plan, price };
  47 |   }
  48 | 
  49 |   async getSuccessMessageText(): Promise<string> {
  50 |     const text = await this.page.locator('#successSection h2').textContent();
  51 |     return text?.trim() ?? '';
  52 |   }
  53 | 
  54 |   async getSummaryField(field: 'Name' | 'Email' | 'Coverage' | 'Plan' | 'Monthly Cost'): Promise<string> {
  55 |     // Summary table: find the row whose first cell matches the label
  56 |     const rows = this.page.locator('table tr');
  57 |     const count = await rows.count();
  58 |     for (let i = 0; i < count; i++) {
  59 |       const label = await rows.nth(i).locator('td').first().textContent();
  60 |       if (label?.trim() === field) {
  61 |         return (await rows.nth(i).locator('td').last().textContent()) ?? '';
  62 |       }
  63 |     }
  64 |     return '';
  65 |   }
  66 | 
  67 |   async startOver() {
  68 |     await this.page.getByTestId('btn-start-over').click();
  69 |   }
  70 | }
  71 | 
```