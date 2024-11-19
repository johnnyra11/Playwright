const { test, expect, chromium } = require('@playwright/test');

test('has title', async () => {
  // Launch the browser in headless mode explicitly
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle(/Playwright/);
  await browser.close();
});
