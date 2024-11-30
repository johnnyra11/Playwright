const { test, expect } = require("@playwright/test");

test("Login Functionality", async ({ page }) => {
  // Navigate to the "Sign In" page
  await page.goto("https://rahulshettyacademy.com/client/"); 
  // Enter valid email and password credentials
    await page.locator("#userEmail").fill("budemposmotreti11@gmail.com");
    await page.locator("#userPassword").fill('Curent37*');
    
    await page.waitForLoadState("networkidle");

  // Click on the "Sign In" button
  await page.locator('[value="Login"]').click();

  // Wait for the account dashboard to load
  await page.getByText('Automation Practice'); 

// Verify that the "Sign Out" button is visible by text content
const signOutButtonVisible = await page.locator('text="Sign Out"').isVisible(); // Locating the "Sign Out" button by its text
expect(signOutButtonVisible).toBeTruthy(); // Assert that the "Sign Out" button is visible

  // Click the "Sign Out" button
  await page.getByRole('button', { name: 'Sign Out' }).click();

});
