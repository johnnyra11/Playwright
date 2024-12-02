
import { rahulshettyacademyLocators } from "./rahulshettyacademyLocators";
import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";

// Constants
const BASE_URL = "https://rahulshettyacademy.com/client/";

async function generatePhoneNumber() {
  // Generate a 10-digit phone number using Faker
  return faker.phone.number("##########"); // Format as 10-digit phone number
}

// Helper Functions
async function fillRegisterForm(page, locators, testData) {
  await page.locator(locators.firstNameField).fill(testData.firstName);
  await page.locator(locators.lastNameField).fill(testData.lastName);
  await page.locator(locators.userEmailField).fill(testData.email);
  await page.locator(locators.userMobileField).fill(testData.mobile);
  await page
    .locator(locators.occupationDropDown)
    .selectOption({ label: testData.occupation });
  await page.locator(locators.gender.male).click();
  await page.locator(locators.userPasswordField).fill(testData.password);
  await page.locator(locators.confirmPasswordField).fill(testData.password);
  await page.locator(locators.checkBox).check();
}

test.only("Register, Login, and Validate Product", async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { height: 900, width: 1600 },
  });
  const page = await context.newPage();

  const phoneNumber = await generatePhoneNumber();
  // Test Data
  const testData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    mobile: phoneNumber.replace(/\D/g, "").slice(0, 10),
    occupation: "Student",
    password: faker.internet.password({
      length: 12,
      memorable: true,
      pattern: /[a-z]/,
      prefix: "!Q1",
    }),
  };

  // Step 1: Navigate to the website
  await page.goto(BASE_URL);
  const title = await page.title();
  console.log(`The page title is: ${title}`);
  expect(title).toContain("Let's Shop"); // Custom assertion

  // Step 2: Open the Registration Form
  await page.locator(rahulshettyacademyLocators.registerButton).click();
  await expect(
    page.locator(rahulshettyacademyLocators.registerForm.firstNameField)
  ).toBeVisible();

  // Step 3: Fill and Submit Registration Form
  await fillRegisterForm(
    page,
    rahulshettyacademyLocators.registerForm,
    testData
  );
  await page
    .locator(rahulshettyacademyLocators.registerForm.registerButton)
    .click();

  // Step 4: Verify Registration Success and Navigate to Login
  console.log(`Registered with Email: ${testData.email}`);
  console.log(`Password: ${testData.password}`);
  await page
    .locator(rahulshettyacademyLocators.registerForm.goToLoginButton)
    .click();
  await expect(
    page.locator(rahulshettyacademyLocators.loginForm.userEmailField)
  ).toBeVisible();

  // Step 5: Login with Registered Credentials
  await page
    .locator(rahulshettyacademyLocators.loginForm.userEmailField)
    .fill(testData.email);
  await page
    .locator(rahulshettyacademyLocators.loginForm.userPasswordField)
    .fill(testData.password);
  await page.locator(rahulshettyacademyLocators.loginForm.loginButton).click();

  // Step 6: Verify Products are Displayed
  const firstProduct = await page
    .locator(rahulshettyacademyLocators.products.productName)
    .nth(0)
    .textContent();
  console.log(`First Product Name: ${firstProduct}`);
  await expect(
    page.locator(rahulshettyacademyLocators.products.productName).nth(0)
  ).toBeVisible();

  await context.close();
});
