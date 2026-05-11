import { defineConfig, devices } from '@playwright/test';
import path from 'path';

// Local file URL for the mock portal (no server needed)
const portalUrl = `file://${path.resolve(__dirname, 'portal/index.html')}`;

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: portalUrl,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
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
  ],
});
