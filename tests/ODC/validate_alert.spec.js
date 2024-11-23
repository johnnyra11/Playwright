const { test, expect } = require("@playwright/test");

// Test to interact with the alert dialog triggered by a button click
test.only("drop down", async ({ page }) => {
  // Navigate to the specified webpage
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  // Verify that the alert button (#alertbtn) is visible on the page
  await expect(page.locator("#alertbtn")).toBeVisible();

  // Handle the alert dialog triggered by clicking the alert button
  await Promise.all([
    // Listen for the dialog event and handle it
    page.on("dialog", async (dialog) => {
      // Check if the dialog is of type 'alert'
      expect(dialog.type()).toBe("alert");

      // Accept the alert dialog
      dialog.accept();
    }),

    // Trigger the dialog by clicking the alert button
    page.locator("#alertbtn").click(),
  ]);
});
