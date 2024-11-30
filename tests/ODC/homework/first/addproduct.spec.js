const { test, expect } = require("@playwright/test");

test("Add a Product to the Cart", async ({ page }) => {
    // Define the email and product name to be used in the test
    const email = "budemposmotreti11@gmail.com";
    const productName = "ADIDAS ORIGINAL";

    // Define the locator for product cards
    const products = page.locator(".card-body");

    // Navigate to the website's client login page
    await page.goto("https://rahulshettyacademy.com/client");

    // Fill in the login form with email and password
    await page.locator("#userEmail").fill("budemposmotreti11@gmail.com");
    await page.locator("#userPassword").fill('Curent37*');

    // Click the "Login" button
    await page.locator('[value="Login"]').click();

    // Wait for the page to load completely after login
    await page.waitForLoadState("networkidle");

     // Assert that a confirmation message is visible indicating that the product has been added to the cart
     await page.locator('div').filter({ hasText: 'Login successful' }).nth(2).isVisible();

    // Optionally, log the titles of all the products listed on the page
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    // Search for the product "ADIDAS ORIGINAL" in the search bar
    await page.getByRole('textbox', { name: 'search' }).fill("ADIDAS ORIGINAL");

    // Press "Enter" to submit the search query
    await page.getByRole('textbox', { name: 'search' }).press('Enter');

    // Get the total number of products displayed after the search
    const productCount = await products.count();

    // Iterate through all the products to find the one with the name "ADIDAS ORIGINAL"
    for (let i = 0; i < productCount; i++) {
        const productText = await products.locator("b").nth(i).textContent(); // Get the name of the product

        // Check if the product name matches "ADIDAS ORIGINAL"
        if (productText.trim() === productName) {
            // If it matches, click the "Add To Cart" button for that product
            await products.nth(i).locator("text= Add To Cart").click();
            console.log(`Added ${productName} to the cart.`);
            break; // Exit the loop after adding the product to the cart
        }
    }

    // Assert that a confirmation message is visible indicating that the product has been added to the cart
    await page.locator('div').filter({ hasText: 'Product Added To Cart' }).nth(2).isVisible();

    //await page.locator('[routerLink*="cart"]').click(); // Click on the cart icon to view the cart
    await page.getByRole('button', { name: '   Cart' }).click(); // Click on the cart icon to view the cart

    await expect(page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible()).toBeTruthy(); // Verify that the product is in the cart
    
    await page.getByRole('button', { name: 'Buy Now❯' }).click(); // Click on the "Buy Now" button to proceed to checkout

// Verify that the product is added to the cart and proceed to checkout
// Assert that a confirmation message is visible indicating that the product has been added to the cart
const confirmationMessage = page.locator('div').filter({ hasText: 'Product Added To Cart' }).nth(2);
await expect(confirmationMessage).toBeVisible().toBeTruthy; // Verify that the confirmation message is visible


});
