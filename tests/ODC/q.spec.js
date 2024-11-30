const { test, expect } = require("@playwright/test");

let webContext; // Global variable to hold the web context for reuse in test cases

test.beforeAll(async ({ browser }) => {
  // Step 1: Create a new browser context
  const context = await browser.newContext();

  // Step 2: Open a new page in the context
  const page = await context.newPage();

  // Step 3: Navigate to the login page
  await page.goto("https://rahulshettyacademy.com/client");

  // Step 4: Fill in the login credentials
  await page.locator("#userEmail").fill("alex@alex.com"); // Replace with the correct email
  await page.locator("#userPassword").fill("Alex!994"); // Replace with the correct password

  // Step 5: Click the login button
  await page.locator("[value='Login']").click();

  // Step 6: Wait for the network to become idle (indicates the page has finished loading)
  await page.waitForLoadState("networkidle");

  // Step 7: Save the browser's storage state to a file
  // This includes cookies, local storage, etc., allowing for persistent login
  await context.storageState({ path: "state.json" });

  // Step 8: Create a new browser context using the saved storage state
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("@QA Client App login", async () => {
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products = page.locator(".card-body");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
