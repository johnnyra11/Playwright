const { test, expect } = require("@playwright/test");

test("Checkout Process", async ({ page }) => {
  // Navigate to the website's homepage
  await page.goto("https://example.com"); // Replace with the actual website URL

  // Search for a product (e.g., "jacket") and add it to the shopping cart
  await page.fill("#searchBar", "jacket"); // Replace '#searchBar' with the search bar's selector
  await page.click("#searchButton"); // Replace '#searchButton' with the search button's selector
  await page.waitForSelector(".product-card"); // Wait for the search results to load

  const product = page.locator(".product-card").first(); // Replace '.product-card' with the product card selector
  await expect(product).toBeVisible();
  await product.click(); // Select the product

  await page.click("#addToCartButton"); // Replace '#addToCartButton' with the selector for the Add to Cart button

  // Navigate to the cart page
  await page.click("#cartIcon"); // Replace '#cartIcon' with the selector for the cart icon
  await page.click("#proceedToCheckoutButton"); // Replace '#proceedToCheckoutButton' with the selector for the checkout button

  // Fill in the shipping address
  await page.fill("#addressLine1", "123 Main Street"); // Replace with the actual selector for the address line 1 field
  await page.fill("#city", "New York"); // Replace with the actual selector for the city field
  await page.fill("#state", "NY"); // Replace with the actual selector for the state field
  await page.fill("#zipCode", "10001"); // Replace with the actual selector for the ZIP code field
  await page.selectOption("#shippingMethod", "Standard"); // Replace with the selector for the shipping method dropdown

  // Enter payment details
  await page.fill("#cardNumber", "4111111111111111"); // Replace with the actual selector for the card number field
  await page.fill("#expiryDate", "12/25"); // Replace with the actual selector for the expiry date field
  await page.fill("#cvv", "123"); // Replace with the actual selector for the CVV field

  // Submit the order
  await page.click("#submitOrderButton"); // Replace with the selector for the order submission button

  // Verify the order was placed successfully
  await expect(page).toHaveURL(/order-confirmation/); // Ensure the user is redirected to the order confirmation page
  const confirmationMessage = await page.locator(".order-success-message").textContent(); // Replace with the actual selector for the success message
  expect(confirmationMessage).toContain("Your order has been placed successfully"); // Update as needed for the exact success message

  // Verify the order summary is displayed
  const orderSummary = await page.locator(".order-summary").isVisible(); // Replace with the selector for the order summary
  expect(orderSummary).toBeTruthy();
});
