import { defineConfig, devices } from '@playwright/test';
import { buildFileUrl } from './utils/helpers';

const environment = process.env.ENVIRONMENT ?? 'local';
const isCI = !!process.env.CI;

const baseUrls = {
  local: buildFileUrl('portal/index.html'),
  staging: 'https://staging.safeguard-insurance.example.com',
};

const baseURL = baseUrls[environment as keyof typeof baseUrls];
if (!baseURL) {
  throw new Error(`Unknown ENVIRONMENT: ${environment}`);
}

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: isCI ? 2 : 0,
  reporter: isCI
    ? [
        ['html', { open: 'never' }],
        ['junit', { outputFile: 'test-results/junit.xml' }],
      ]
    : [['list']],

  use: {
    baseURL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
