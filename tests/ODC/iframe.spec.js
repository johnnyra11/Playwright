const { test, expect } = require("@playwright/test");

// Login to the website
test.only("iFrame", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // Access the iframe
    const framesPage = page.frameLocator("#courses-iframe");

    // Wait for the target element to appear
    await framesPage.locator("li a[href*='lifetime-access']:visible").waitFor();

    // Click the link
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();

    // Extract and log text
    const textCheck = await framesPage.locator(".text h2").textContent();
    if (textCheck) {
        console.log("Extracted text:", textCheck);
        console.log("Second word:", textCheck.split(" ")[1]);
    } else {
        console.error("Text not found in .text h2");
    }
});
