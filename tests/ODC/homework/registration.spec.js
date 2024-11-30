const { test, expect } = require("@playwright/test");

test("User Registration", async ({ page }) => {
  // Navigate to the "Create an Account" page
  await page.goto("https://example.com/register"); // Replace with the actual URL for the registration page

  // Fill in the registration form with valid details
  await page.fill("#firstName", "John"); // Replace '#firstName' with the actual selector for the first name field
  await page.fill("#lastName", "Doe"); // Replace '#lastName' with the actual selector for the last name field
  await page.fill("#email", "johndoe@example.com"); // Replace '#email' with the actual selector for the email field
  await page.fill("#password", "SecurePassword123"); // Replace '#password' with the actual selector for the password field
  await page.fill("#confirmPassword", "SecurePassword123"); // Replace '#confirmPassword' with the actual selector for the confirm password field

  // Submit the registration form
  await page.click("#registerButton"); // Replace '#registerButton' with the actual selector for the submit button

  // Verify that the account is created successfully
  await expect(page).toHaveURL(/dashboard/); // Ensure the user is redirected to their dashboard
  const successMessage = await page.locator(".success-message").textContent(); // Replace '.success-message' with the actual selector for the success message
  expect(successMessage).toContain("Your account has been created successfully"); // Update as needed for the exact success message

  // Verify the user's account dashboard is displayed
  const dashboardGreeting = await page.locator(".dashboard-greeting").textContent(); // Replace '.dashboard-greeting' with the selector for the greeting message
  expect(dashboardGreeting).toContain("Welcome, John"); // Ensure the personalized greeting is displayed
});
