const { test, expect } = require('@playwright/test');

test.only('Browser Context Playwright Test', async ({ browser }) => {
    // Create a new browser context and page
    const context = await browser.newContext();
    const page = await context.newPage();

    // Locators
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signIn = page.locator('#signInBtn');
    const errorMessage = page.locator('div[style*="block"]');
    const productLinks = page.locator('.card-body a');
    const cardTitles = page.locator('.card-body a');
    const dropdown = page.locator('select.form-control');
    const radioButton = page.locator('.customradio');
    const termsOfConditions = page.locator('#terms');
    const okayButton = page.locator('#okayBtn');

    // Navigate to the login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // Verify the page title
    await expect(page).toHaveTitle(/Login/);
    console.log(`Page title: ${await page.title()}`);

    // Interact with dropdown
    await dropdown.selectOption('consult');
    console.log('Dropdown selected: consult');

    // Click on the last radio button and confirm the selection
    await radioButton.last().click();
    await okayButton.click();
    console.log(`Radio button checked: ${await radioButton.last().isChecked()}`);
    await expect(radioButton.last()).toBeChecked();
    await page.pause()

    // Interact with the Terms & Conditions checkbox
    await termsOfConditions.check(); // Select the checkbox
    await expect(termsOfConditions).toBeChecked();
    console.log('Terms & Conditions checkbox selected.');
    await page.pause()
    await termsOfConditions.uncheck(); // Deselect the checkbox
    await expect(termsOfConditions).not.toBeChecked();
    console.log('Terms & Conditions checkbox deselected.');

    // Interact with username and password fields (optional example)
    await username.fill('rahulshetty');
    await password.fill('learning');
    await signIn.click();

    // Verify error message (if any)
    // Uncomment below if you want to check for incorrect login scenarios
    // await expect(errorMessage).toContainText('Incorrect');
    // console.log('Error message displayed.');

    // Extract and log product card titles
    const allTitles = await cardTitles.allTextContents();
    console.log('Product titles:', allTitles);

    // Save the link into a constant
    const documentLink = page.locator("[href*='documents-request']");
    // Assert that the documentLink has the attribute class with the value blinkingText
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    await page.pause()
    // Close the context
    await context.close();
});
