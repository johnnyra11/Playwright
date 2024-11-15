const { test, expect } = require('@playwright/test');

// Set browser context
test.only('Browser Context Playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveTitle(/Login/);
    console.log(await page.title());
    //css, xpath
    await page.locator('#username').fill('rahulshetty');
    await page.locator('#password').fill('learning');
    await page.locator('#signInBtn').click();
    //console.log(await page.locator(`div[style*="block"]`).textContent("Incorrect"));
    await expect(page.locator(`div[style*="block"]`)).toContainText("Incorrect");
});
