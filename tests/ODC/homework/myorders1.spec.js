const { test, expect } = require("@playwright/test");

// Login to the website and perform product purchase, checkout, and order verification
test.only("tt", async ({ page }) => {
    const productName = "ZARA COAT 3"; // The product we want to add to the cart
    const products = page.locator(".card-body"); // Locator for all product cards
    const email = "budemposmotreti11@gmail.com"; // User's email address for login

    // Navigate to the login page
    await page.goto("https://rahulshettyacademy.com/client/");
    
    // Fill in the email and password fields, then submit the login form
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Curent37*");
    await page.locator('[value="Login"]').click();
    
    // Wait for the page to load completely (network idle state)
    await page.waitForLoadState("networkidle");

    // Retrieve and log the titles of all products displayed on the page
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    // Get the total number of products listed on the page
    const productCount = await products.count();
    for (let i = 0; i < productCount; i++) {
        // Get the name of the product at the current index
        const productText = await products.locator("b").nth(i).textContent();

        // If the product name matches the desired product, add it to the cart
        if (productText.trim() === productName) { // Trim to avoid any extra whitespace
            await products.nth(i).locator("text= Add To Cart").click();
            console.log(`Added ${productName} to the cart.`);
            break; // Exit the loop once the product is added
        }
    }

    // Navigate to the cart by clicking the cart icon
    await page.locator('[routerLink*="cart"]').click();

    // Wait for the cart page to load
    await page.locator("div li").first().waitFor();

    // Verify that the desired product is present in the cart
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy(); // Assert that the product is visible in the cart

    // Proceed to checkout
    await page.locator("text=Checkout").click();

    // Start typing the country name in the country selector
    await page.locator('[placeholder*="Country"]').pressSequentially("uni", { delay: 100 });

    const dropdown = page.locator(".ta-results"); // Locator for the dropdown containing country options
    await dropdown.waitFor(); // Wait for the dropdown to appear

    // Loop through the dropdown options to select the desired country
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " United States Minor Outlying Islands") {
            await dropdown.locator("button").nth(i).click(); // Select the country
            console.log(`Selected ${text}`);
            break; // Exit the loop once the country is selected
        }
    }

    // Verify that the user's email is displayed correctly during checkout
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

    // Submit the order
    await page.locator(".action__submit").click();

    // Verify the order confirmation message
    await expect(page.locator("h1")).toHaveText("Thankyou for the order.");

    // Retrieve and log the order ID from the confirmation page
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    // Navigate to the "My Orders" page
    await page.locator("button[routerlink*='myorders']").click();

    // Wait for the orders table to load
    await page.locator("tbody").waitFor();

    // Locate all rows in the orders table
    const rows = page.locator("tbody tr");

    // Loop through the rows to find the order ID
    for (let i = 0; i < (await rows.count()); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) { // Match the order ID with the current row
            await rows.nth(i).locator("button").first().click(); // Click the "View Details" button
            console.log(`Found order ${orderId}`);
            break; // Exit the loop once the order is found
        }
    }

    // Verify that the order details match the order ID
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
