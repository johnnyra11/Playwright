// Import necessary modules from Playwright
import { test, expect } from 'playwright/test';

// Define a test case and set it to run exclusively using `test.only`
test.only('test', async ({ page }) => {
    // Navigate to the GitHub profile page
    await page.goto('https://github.com/BakkappaN');

    // Click on the "Sign in" link to navigate to the login page
    await page.getByRole('link', { name: 'Sign in' }).click();

    // Click on the "Username or email address" input field
    await page.getByLabel('Username or email address').click();

    // Fill the "Username or email address" input field with test data
    await page.getByLabel('Username or email address').fill('456789dfgh');

    // Click on the "Password" input field
    await page.getByLabel('Password').click();

    // Fill the "Password" input field with test data
    await page.getByLabel('Password').fill('ertyu34567');

    // Verify that the "Sign in" button is visible
    await expect(page.getByRole('button', { name: 'Sign in', exact: true })).toBeVisible();

    // Click the "Sign in" button to attempt logging in
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();

    // Validate that an error message is displayed indicating incorrect username
    await expect(page.getByRole('alert')).toContainText('Incorrect username');

    // Uncomment the line below if you need to pause the test for debugging
    // await page.pause();
});
