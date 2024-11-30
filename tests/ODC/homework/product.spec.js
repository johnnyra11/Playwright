const { test, expect } = require("@playwright/test");

test("Search for a Product", async ({ page }) => {
  // Navigate to the website's homepage
  await page.goto("https://example.com"); // Replace with the actual URL of the website

  // Enter the product name (e.g., "jacket") in the search bar
  await page.fill("#searchBar", "jacket"); // Replace '#searchBar' with the actual selector for the search bar

  // Click the "Search" button
  await page.click("#searchButton"); // Replace '#searchButton' with the actual selector for the search button

  // Wait for the search results to load
  await page.waitForSelector(".search-results"); // Replace '.search-results' with an actual element unique to the search results

  // Assert that at least one search result is displayed
  const searchResults = await page.locator(".product-card"); // Replace '.product-card' with the actual selector for a single product result
  const resultCount = await searchResults.count();
  expect(resultCount).toBeGreaterThan(0);

  // Loop through each search result and verify required elements
  for (let i = 0; i < resultCount; i++) {
    const product = searchResults.nth(i);

    // Verify that each product has a name
    const productName = await product.locator(".product-name").isVisible(); // Replace '.product-name' with the actual selector for the product name
    expect(productName).toBeTruthy();

    // Verify that each product has an image
    const productImage = await product.locator(".product-image").isVisible(); // Replace '.product-image' with the actual selector for the product image
    expect(productImage).toBeTruthy();

    // Verify that each product has a price
    const productPrice = await product.locator(".product-price").isVisible(); // Replace '.product-price' with the actual selector for the product price
    expect(productPrice).toBeTruthy();

    // Verify that each product has an "Add to Cart" button
    const addToCartButton = await product.locator(".add-to-cart-button").isVisible(); // Replace '.add-to-cart-button' with the actual selector for the button
    expect(addToCartButton).toBeTruthy();
  }
});
