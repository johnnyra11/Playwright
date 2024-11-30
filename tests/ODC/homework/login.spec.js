const { test, expect } = require("@playwright/test");

test("Login Functionality", async ({ page }) => {
  // Navigate to the "Sign In" page
  await page.goto("https://example.com/signin"); // Replace with the actual URL of the "Sign In" page

  // Enter valid email and password credentials
  await page.fill("#email", "validuser@example.com"); // Replace with valid test email
  await page.fill("#password", "ValidPassword123"); // Replace with valid test password

  // Click on the "Sign In" button
  await page.click("#signInButton"); // Replace with the actual selector for the "Sign In" button

  // Wait for the account dashboard to load
  await page.waitForSelector("#dashboard"); // Replace with an actual element unique to the dashboard page

  // Verify that the user is greeted with a personalized message
  const greetingText = await page.locator("#greetingMessage").textContent(); // Replace with the actual selector for the greeting message
  expect(greetingText).toContain("Welcome, First Name!"); // Update to match the personalized greeting

  // Verify that the "Sign Out" button is visible in the header
  const signOutButtonVisible = await page.isVisible("#signOutButton"); // Replace with the actual selector for the "Sign Out" button
  expect(signOutButtonVisible).toBeTruthy();
});
