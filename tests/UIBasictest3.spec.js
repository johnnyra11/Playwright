const { test, expect } = require('@playwright/test');

test.only('Browser Context Playwright Test', async ({ browser }) => {
    // Create a new browser context and page
    const context = await browser.newContext();
    const page = await context.newPage();

    // Locators
    const locators = {
        username: page.locator('#username'),
        password: page.locator('#password'),
        signIn: page.locator('#signInBtn'),
        errorMessage: page.locator('div[style*="block"]'),
        productLinks: page.locator('.card-body a'),
        cardTitles: page.locator('.card-body a'),
        dropdown: page.locator('select.form-control'),
        radioButton: page.locator('.customradio'),
        termsOfConditions: page.locator('#terms'),
        okayButton: page.locator('#okayBtn'),
        documentLink: page.locator("[href*='documents-request']"),
    };

    // Navigate to the login page
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    // Verify the page title
    await expect(page).toHaveTitle(/Login/);
    console.log(`Page title: ${await page.title()}`);

    // Interact with dropdown
    await locators.dropdown.selectOption('consult');
    console.log('Dropdown selected: consult');

    // Interact with the radio button
    await locators.radioButton.last().click();
    await locators.okayButton.click();
    const isChecked = await locators.radioButton.last().isChecked();
    console.log(`Radio button checked: ${isChecked}`);
    await expect(locators.radioButton.last()).toBeChecked();

    // Interact with the Terms & Conditions checkbox
    await locators.termsOfConditions.check();
    console.log('Terms & Conditions checkbox selected.');
    await expect(locators.termsOfConditions).toBeChecked();

    await locators.termsOfConditions.uncheck();
    console.log('Terms & Conditions checkbox deselected.');
    await expect(locators.termsOfConditions).not.toBeChecked();

    // Fill in login details
    await locators.username.fill('rahulshetty');
    await locators.password.fill('learning');
    await locators.signIn.click();

    // Extract and log product card titles
    const allTitles = await locators.cardTitles.allTextContents();
    console.log('Product titles:', allTitles);

    // Verify the document link attributes
    await expect(locators.documentLink).toHaveAttribute('class', 'blinkingText');
    console.log('Verified document link attribute.');

    // Close the browser context
    await context.close();
});
