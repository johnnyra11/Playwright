const { test, expect, request } = require("@playwright/test");

// Define login payload with user credentials
const loginPayload = {
    userEmail: "budemposmotreti11@gmail.com", // Replace with your email
    userPassword: "Curent37*",               // Replace with your password
};

// Placeholder for storing the authentication token
let authToken;

// Use the `beforeAll` hook to perform login and store the auth token
test.beforeAll(async ({ request }) => {
    // Perform the login request
    const loginResponse = await request.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login", // Login endpoint
        {
            data: loginPayload, // Payload with login credentials
        }
    );

    // Ensure the response is successful
    if (!loginResponse.ok()) {
        throw new Error(`Login failed with status: ${loginResponse.status()}`);
    }

    // Parse the response JSON
    const responseBody = await loginResponse.json();

    // Extract the authentication token from the response
    authToken = responseBody.token;

    // Verify that the token exists
    expect(authToken).toBeDefined();

    // Log the token for debugging (optional)
    console.log("Authentication Token:", authToken);
});

// Test case that makes an authenticated API request
test("Authenticated API request", async ({ request }) => {
    // Ensure the authentication token is available
    expect(authToken).not.toBeUndefined();

    // Perform a GET request to a protected endpoint using the token
    const response = await request.get(
        "https://rahulshettyacademy.com/api/ecom/some/protected/endpoint", // Replace with actual endpoint
        {
            headers: {
                Authorization: `Bearer ${authToken}`, // Add the token to the headers
            },
        }
    );
});