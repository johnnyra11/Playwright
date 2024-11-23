const { test, expect } = require("@playwright/test");

// Placeholder for storing the authentication token
let authToken;
let orderId;

// Define login payload with user credentials
const loginPayload = {
    userEmail: "budemposmotreti11@gmail.com", // Replace with your email
    userPassword: "Curent37*",               // Replace with your password
};

// `beforeAll` hook to authenticate and store the token
test.beforeAll(async ({ request }) => {
    const loginResponse = await request.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login", // Login endpoint
        { data: loginPayload }
    );

    // Ensure the response status is OK
    expect(loginResponse.ok()).toBeTruthy();

    // Parse the response JSON and extract the token
    const loginResponseJson = await loginResponse.json();
    authToken = loginResponseJson.token;

    // Validate token is defined
    expect(authToken).toBeDefined();
    console.log("Authentication Token:", authToken);
});

// Test case to inject token and perform authenticated actions
test("Inject token into local storage and perform authenticated actions", async ({ page }) => {
    // Inject the token into local storage before the page loads
    await page.addInitScript((token) => {
        window.localStorage.setItem("token", token);
    }, authToken);

    // Navigate to the client page
    await page.goto("https://rahulshettyacademy.com/client");

    // Log the stored token to confirm injection
    const storedToken = await page.evaluate(() => window.localStorage.getItem("token"));
    console.log("Stored Token:", storedToken);
    expect(storedToken).toBe(authToken);

    // Wait for the page to load completely
    await page.waitForLoadState("networkidle");

    //  Validate the element is visible
    const bool = await page.locator("h5:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();


});
