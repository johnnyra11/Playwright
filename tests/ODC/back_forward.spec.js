const { test, expect } = require("@playwright/test");
//Login to the website
test.only("Back&Forward", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("http://google.com");
    await page.goBack();
    await page.goForward();
});