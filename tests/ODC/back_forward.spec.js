const { test, expect } = require("@playwright/test");

// Test case: Back&Forward navigation and element visibility
test.only("Back&Forward", async ({ page }) => {
    // Navigate to the target website
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // These lines are commented but demonstrate navigation history actions
    // await page.goto("http://google.com");  // Navigate to another page
    // await page.goBack();                  // Go back to the previous page
    // await page.goForward();               // Go forward to the next page

    // Check if the displayed text element is visible
    await expect(page.locator("#displayed-text")).toBeVisible();

    // Click on the "Hide" button to hide the textbox
    await page.locator("#hide-textbox").click();

    // Verify that the textbox element is hidden
    await expect(page.locator("#displayed-text")).toBeHidden();

    // Click on the "Show" button to make the textbox visible again
    await page.locator("#show-textbox").click();

    // Verify that the textbox element is visible again
    await expect(page.locator("#displayed-text")).toBeVisible();

    // Trigger an alert by clicking the "Alert" button
    await page.locator("#alertbtn").click();

    // Accept the alert dialog when it appears
    page.on('dialog', dialog => dialog.accept());

    // Trigger a confirmation dialog by clicking the "Confirm" button
    await page.locator("#confirmbtn").click();

    // Hover over the "Mouse Hover" button to display hover options
    await page.locator("#mousehover").hover();

    // Check if the "Top" option under hover is visible
    const isTopVisible = await page.locator('text=Top').isVisible();
    if (isTopVisible) {
        console.log('"Top" option is visible'); // Log visibility status
        // Click the "Top" option to trigger its action
        await page.locator("a[href='#top']").click();
    } else {
        console.log('"Top" option is not visible'); // Log if the option is not visible
    }

    // Hover over the "Mouse Hover" button again
    await page.locator("#mousehover").hover();

    // Check if the "Reload" option under hover is visible
    const isReloadVisible = await page.locator('text=Reload').isVisible();
    if (isReloadVisible) {
        console.log('"Reload" option is visible'); // Log visibility status
        // Click the "Reload" option to reload the page
        await page.locator('text=Reload').click();
    } else {
        console.log('"Reload" option is not visible'); // Log if the option is not visible
    }
});
