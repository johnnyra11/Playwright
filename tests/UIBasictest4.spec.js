const { test, expect } = require('@playwright/test');

// Set browser context
test.only('Browser Context Playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const documentLink = page.locator(".blinkingText");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //Define a constant for the page title
    const [newPage] = await Promise.all([ context.waitForEvent("page"), documentLink.click() ]);

    await page.pause();

    await expect(newPage.locator(".im-para.red")).toBeVisible();
    const text = await newPage.locator(".im-para.red").textContent();
    // console.log(text);

    const firstSplit = text.split("@");
    const domain = firstSplit[1].split(" ")[0];
    console.log(domain);

    const userName = page.locator("#username");
    await userName.fill(domain);
    await page.pause()
});
