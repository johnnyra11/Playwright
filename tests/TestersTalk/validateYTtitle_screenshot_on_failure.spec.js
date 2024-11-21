// Include Playwright module
const { test, expect } = require('@playwright/test');

// Write a test
test('Validate YouTube Title', async ({ page }) => {
    // Go to URL
    await page.goto('https://youtube.com');

    // Search with a keyword
    await page.getByPlaceholder('Search').click();
    await page.getByPlaceholder('Search').fill('cypress by testers talk');
    await page.getByRole('button', { name: 'Search', exact: true }).click();

    // Wait for search results to load
    await page.waitForTimeout(5000); // Consider replacing with proper waiting for specific elements

    // Click on the playlist
    await page.getByRole('link', { name: 'Cypress by Testers Talk' }).click();

    // Validate the title
    await expect(page).toHaveTitle('Cypress Tutorial Full Course 2023 | Learn Cypress in 5 Hrs - YouTube');
});


    