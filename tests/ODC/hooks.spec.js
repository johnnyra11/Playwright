const { test, expect, request } = require("@playwright/test");

// Placeholder for storing the authentication token
let authToken;
const loginResponseJson = await loginResponse.json();
token = loginResponseJson.token;

// Define login payload with user credentials
const loginPayLoad = {
    userEmail: "budemposmotreti11@gmail.com",  // Replace with your email
    userPassword: "Curent37*",                // Replace with your password
};


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    { data: loginPayLoad }
    );
    });
expect(loginResponse.ok()).toBeTruthy();
page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
    }, token);
