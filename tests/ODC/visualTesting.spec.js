const { test, request, expect } = require("@playwright/test");

test.only("Screenshot & Visual comparision", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page
    .locator("#displayed-text")
    .screenshot({ path: "partialScreenshot.png" });
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: "screenshot.png" });
  await expect(page.locator("#displayed-text")).toBeHidden();
});

test.only("Visual testing", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  expect(await page.screenshot()).toMatchSnapshot("landing.png");
});