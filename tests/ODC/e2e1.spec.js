// Test for interacting with form elements and shopping functionality
const { test, expect } = require("@playwright/test");

// Test for interacting with form elements and shopping functionality
test.only("drop down", async ({ page }) => {
  // Navigate to the website
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  // Click the checkbox labeled "Check me out if you Love IceCreams!"
  await page.getByLabel("Check me out if you Love IceCreams!").click();

  // Select the "Employed" radio button
  await page.getByLabel("Employed").check();

  // Select "Female" from the dropdown labeled "Gender"
  await page.getByLabel("Gender").selectOption("Female");

  // Fill the password field with "abc123"
  await page.getByPlaceholder("Password").fill("abc123");

  // Click the "Submit" button to submit the form
  await page.getByRole("button", { name: "Submit" }).click();

  // Navigate to the "Shop" page by clicking the "Shop" link
  await page.getByRole("link", { name: "Shop" }).click();

  // Assert that the last product card (app-card) on the "Shop" page is visible
  await expect(page.locator("app-card").last()).toBeVisible();

  // Find the product card containing the text "Nokia Edge" and click the "Add to Cart" button
  await page
    .locator("app-card")
    .filter({ hasText: "Nokia Edge" }) // Filter for the card with the text "Nokia Edge"
    .getByRole("button") // Locate the button within the filtered card
    .click();
    
  // Verify that the success message "Success! The Form has been submitted successfully!" is visible
  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
});
