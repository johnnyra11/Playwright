const { test, expect } = require('@playwright/test');

// Set browser context
test.only('Browser Context Playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Locators
    const username = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const errorMessage = page.locator('div[style*="block"]');
    const productLinks = page.locator('.card-body a');
    const cardTitles = page.locator('.card-body a');
    const allTitles = await cardTitles.allTextContents();


    // Navigate to the page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // Verify the page title
    await expect(page).toHaveTitle(/Login/);
    console.log(await page.title());

    // Interact with elements
    await username.fill('rahulshetty');
    await page.locator('#password').fill('learning');
    await signIn.click();

    // Verify error message (uncomment if needed)
    // await expect(errorMessage).toContainText("Incorrect");

    // Interact with specific product link
    console.log(await productLinks.first().allTitles); // Logs the text of the first product link
});
//console.log(allTitles);
