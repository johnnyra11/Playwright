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

// Ensure the page is fully loaded before asserting visibility
await page.waitForSelector('text="Sign Out"'); // Wait for the "Sign Out" button to appear on the page

// Check if the "Sign Out" button is visible
const signOutButtonVisible = await page.locator('text="Sign Out"').isVisible();
console.log(`Sign Out button visible: ${signOutButtonVisible}`); // Log the visibility for debugging

// Assert that the "Sign Out" button is visible
expect(signOutButtonVisible).toBeTruthy(); // Assert that the "Sign Out" button is visible


});
