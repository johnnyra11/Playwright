const { test, expect } = require("@playwright/test");
//Login to the website
test.only("tt", async ({ page }) => {
const productName = "ZARA COAT 3";
const products = page.locator(".card-body");
const email = "budemposmotreti11@gmail.com";
await page.goto("https://rahulshettyacademy.com/client/");
await page.locator("#userEmail").fill("budemposmotreti11@gmail.com");
await page.locator("#userPassword").fill('Curent37*');
await page.locator('[value="Login"]').click();
await page.waitForLoadState("networkidle");

})