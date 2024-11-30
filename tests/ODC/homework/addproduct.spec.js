const { test, expect } = require("@playwright/test");

test("Add a Product to the Cart", async ({ page }) => {
  // Navigate to the website's homepage
  await page.goto("https://example.com"); // Replace with the actual URL of the website

  // Search for a product (e.g., "jacket")
  await page.fill("#searchBar", "jacket"); // Replace '#searchBar' with the actual selector for the search bar
  await page.click("#searchButton"); // Replace '#searchButton' with the actual selector for the search button

  // Wait for the search results to load
  await page.waitForSelector(".search-results"); // Replace '.search-results' with a selector unique to the search results container

  // Select the first product from the search results
  const firstProduct = page.locator(".product-card").first(); // Replace '.product-card' with the selector for a product card
  await expect(firstProduct).toBeVisible();
  await firstProduct.click();

  // Choose required attributes (e.g., size, color)
  await page.selectOption("#sizeDropdown", "Medium"); // Replace '#sizeDropdown' with the actual selector for the size dropdown
  await page.selectOption("#colorDropdown", "Red"); // Replace '#colorDropdown' with the actual selector for the color dropdown

  // Click the "Add to Cart" button
  await page.click("#addToCartButton"); // Replace '#addToCartButton' with the actual selector for the Add to Cart button

  // Verify that the product is added to the shopping cart
  const confirmationMessage = await page.locator(".confirmation-message").textContent(); // Replace '.confirmation-message' with the actual selector for the confirmation message
  expect(confirmationMessage).toContain("You added jacket to your shopping cart."); // Update as needed for the exact message format

  // Verify that the cart icon updates with the correct number of items
  const cartItemCount = await page.locator("#cartItemCount").textContent(); // Replace '#cartItemCount' with the actual selector for the cart item count
  expect(parseInt(cartItemCount)).toBeGreaterThan(0); // Ensure the cart count is greater than 0
});
